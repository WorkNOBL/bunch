class ApplicationMailer < ActionMailer::Base
  default from: 'notification@bunch.com'
  layout 'mailer'
end
