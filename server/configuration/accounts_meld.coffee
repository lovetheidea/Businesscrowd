orig_updateOrCreateUserFromExternalService = Accounts.updateOrCreateUserFromExternalService
Accounts.updateOrCreateUserFromExternalService = (serviceName, serviceData, options) ->

	if serviceName not in ['facebook', 'github', 'gitlab', 'google', 'meteor-developer', 'linkedin', 'twitter', 'sandstorm', 'wordpress'] and serviceData._OAuthCustom isnt true
		return

	console.log 'orig_updateOrCreateUserFromExternalService'
	
	if serviceName is 'meteor-developer'
		if _.isArray serviceData?.emails
			serviceData.emails.sort (a, b) ->
				return a.primary isnt true

			for email in serviceData.emails
				if email.verified is true
					serviceData.email = email.address
					break

	if serviceName is 'linkedin'
		serviceData.email = serviceData.emailAddress

	if serviceName is 'wordpress'
		if not serviceData.email? and serviceData.user_email?
			serviceData.email = serviceData.user_email

	if serviceData.email

		console.log 'orig_updateOrCreateUserFromExternalService2'
	
		# Find user with given email
		user = RocketChat.models.Users.findOneByEmailAddress serviceData.email
		if user?
	
			console.log 'orig_updateOrCreateUserFromExternalService3'
	
			# If email is not verified, reset password and require password change
			if not _.findWhere user.emails, { address: serviceData.email, verified: true }
				RocketChat.models.Users.resetPasswordAndSetRequirePasswordChange(user._id, true, 'This_email_has_already_been_used_and_has_not_been_verified__Please_change_your_password')

			# Merge accounts
			RocketChat.models.Users.setServiceId user._id, serviceName, serviceData.id

			# Validate email
			RocketChat.models.Users.setEmailVerified user._id, serviceData.email
			
			#setUsername for Wordpress
			if serviceName is 'wordpress'
				
				console.log 'orig_updateOrCreateUserFromExternalService4'
	
				username = options.profile.username or serviceData.user_login
				if username?
					RocketChat.models.Users.setUsername user._id, username
					RocketChat.callbacks.run('usernameSet')
				if serviceData.profile_url?
					Meteor.runAsUser user._id, ->
						Meteor.call 'setAvatarFromService', serviceData.profile_url, null, 'url'

	return orig_updateOrCreateUserFromExternalService.apply(this, arguments)
