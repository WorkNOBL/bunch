if @current_user
  json.status true
  json.(@current_user, :name, :email)
  json.domain @current_user.domains.first.name
else
  json.status false
end