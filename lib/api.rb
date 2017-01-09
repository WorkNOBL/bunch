class Api
  def initialize
    @google = Rails.application.config_for(:google)
    @auth = Signet::OAuth2::Client.new
    @calendar = Google::Apis::CalendarV3::CalendarService.new
  end

  def update_auth user
    @user = user
    @user.update_token
    @auth.access_token = @user[:access_token]
  end

  def get_events(domain)
    @calendar.authorization = @auth
    calendars = @calendar.list_calendar_lists
    events = []

    calendars = calendars.items.select do |calendar|
      /#{domain}/.match(calendar.id.downcase)
    end

    if calendars.empty?
      return {
        status: false,
        message: 'It appears there are no shared calendars within your organization.'
      }
    end

    calendars.each do |calendar|
      calendar_events = @calendar.list_events(
        calendar.id,
        time_max: 90.days.from_now.to_date.rfc3339,
        time_min: Time.now.to_date.rfc3339,
        max_results: 1000
      )

      # Skip
      next unless calendar_events

      calendar_events = calendar_events.items.select do |event|
        event.recurrence.present? && !event.recurring_event_id &&
          !event.creator.self
      end

      calendar_events.reverse!.each do |event|
        recurrence = nil
        per_week = nil
        is_participant = event.creator.email == @user[:email]
        exists = events.any? do |arr_event|
          arr_event[:title] == event.summary
        end

        # go next if `All Day` event or event already exists
        next if event.start.date || exists

        unless event.recurrence.nil?
          recurrence = parse_rrule(event.recurrence)

          unless recurrence[:freq].nil?
            next if recurrence[:freq] == 'yearly'

            if recurrence[:freq] == 'weekly' && recurrence[:validations][:day].nil?
              day = day_to_symbol(event.start.date_time.strftime('%a')[0..1].upcase)
              recurrence[:validations][:day] = [to_wday(day)]
            end
          end
        end

        if !is_participant && !event.attendees.nil?
          is_participant = event.attendees.find do |member|
            member.email == @user[:email]
            # && member.response_status == 'accepted'
          end
        end

        next unless is_participant

        events.push({
          calendar_id: calendar.id,
          id: event.id,
          date: {
            time_start: event.start.date_time.strftime('%I:%M%p'),
            time_end:  event.end.date_time.strftime('%I:%M%p')
          },
          recurrence: recurrence,
          title: event.summary,
          organizer: event.organizer.display_name || event.organizer.email
        })
      end
    end

    if events.empty?
      return {
        status: false,
        message: 'No shared events available to rate.'
      }
    end

    {
      status: true,
      items: events
    }
  end

  def get_event_emails(options)
    @calendar.authorization = @auth
    event = @calendar.get_event(
      options[:calendar_id],
      options[:event_id],
      always_include_email: true
    )
    obj = {}

    if event
      obj = {
        current_user: {
          email: @user[:email]
        },
        event: {
          title: event.summary
        },
        organizer: event.creator.email
      }

      if event.attendees
        obj[:attendees] = event.attendees.map do |member|
          member.email
        end
      end
    end

    obj
  end

  private

  # heavily inspired by ice_cube parser
  def parse_rrule recurrence
    rule = recurrence.find do |rec|
      /\ARRULE/.match(rec)
    end

    return nil unless rule
    rule = rule.split(':')[1]
    params = {
      validations: {}
    }

    rule.split(';').each do |rule|
      (name, value) = rule.split('=')
      value.strip!
      case name
      when 'FREQ'
        params[:freq] = value.downcase
      when 'INTERVAL'
        params[:interval] = value.to_i
      when 'COUNT'
        params[:count] = value.to_i
      when 'UNTIL'
        params[:until] = Time.parse(value).utc
      when 'WKST'
        params[:wkst] = day_to_symbol(value)
      when 'BYSECOND'
        params[:validations][:second_of_minute] = value.split(',').collect(&:to_i)
      when 'BYMINUTE'
        params[:validations][:minute_of_hour] = value.split(',').collect(&:to_i)
      when 'BYHOUR'
        params[:validations][:hour_of_day] = value.split(',').collect(&:to_i)
      when 'BYDAY'
        dows = {}
        days = []
        value.split(',').each do |expr|
          day = day_to_symbol(expr.strip[-2..-1])
          # day with occurence
          if expr.strip.length > 2
            occ = expr[0..-3].to_i
            dows[day].nil? ? dows[day] = [occ] : dows[day].push(occ)
            days.delete(to_wday(day))
          else
            days.push to_wday(day) if dows[day].nil?
          end
        end
        params[:validations][:day_of_week] = dows unless dows.empty?
        unless days.empty?
          # days = days.sort_by do |day|
          #   day
          # end
          params[:validations][:day] = days
        end
      when 'BYMONTHDAY'
        params[:validations][:day_of_month] = value.split(',').collect(&:to_i)
      when 'BYMONTH'
        params[:validations][:month_of_year] = value.split(',').collect(&:to_i)
      when 'BYYEARDAY'
        params[:validations][:day_of_year] = value.split(',').collect(&:to_i)
      when 'BYSETPOS'
      else
        raise "Invalid or unsupported rrule command: #{name}"
      end
    end

    params[:interval] ||= 1
    params.delete(:wkst) unless params[:freq] == 'weekly'
    params
  end

  def day_to_symbol str
    ical_days = {
      'SU' => :sunday,
      'MO' => :monday,
      'TU' => :tuesday,
      'WE' => :wednesday,
      'TH' => :thursday,
      'FR' => :friday,
      'SA' => :saturday
    }

    day = ical_days[str]
    day
  end

  def to_wday sym
    days = {
      :sunday => 0,
      :monday => 1,
      :tuesday => 2,
      :wednesday => 3,
      :thursday => 4,
      :friday => 5,
      :saturday => 6
    }

    days.fetch(sym) do |k|
      days.values.detect { |i| i.to_s == k.to_s } or
      raise ArgumentError, "Expecting Fixnum or Symbol value for weekday. No such weekday: #{k.inspect}"
    end
  end

end
