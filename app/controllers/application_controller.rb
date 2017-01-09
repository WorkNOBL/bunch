class ApplicationController < ActionController::Base
  def initialize
    super
    @api = Api.new
  end
end
