orig_updateOrCreateUserFromExternalService = Accounts.updateOrCreateUserFromExternalService
Accounts.updateOrCreateUserFromExternalService = (serviceName, serviceData, options) ->

	if serviceName not in ['facebook', 'github', 'gitlab', 'google', 'meteor-developer', 'linkedin', 'twitter', 'sandstorm', 'wordpress'] and serviceData._OAuthCustom isnt true
		return

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

		# Find user with given email
		user = RocketChat.models.Users.findOneByEmailAddress serviceData.email
		if user?
			# If email is not verified, reset password and require password change
			if not _.findWhere user.emails, { address: serviceData.email, verified: true }
				RocketChat.models.Users.resetPasswordAndSetRequirePasswordChange(user._id, true, 'This_email_has_already_been_used_and_has_not_been_verified__Please_change_your_password')

			# Merge accounts
			RocketChat.models.Users.setServiceId user._id, serviceName, serviceData.id

			# Validate email
			RocketChat.models.Users.setEmailVerified user._id, serviceData.email
			
			#setUsername for Wordpress
			if serviceName is 'wordpress'
				username = options.profile.username or serviceData.user_login
				if username?
					RocketChat.models.Users.setUsername user._id, serviceData.email
					RocketChat.callbacks.run('usernameSet')
					Meteor.call 'joinDefaultChannels'

	return orig_updateOrCreateUserFromExternalService.apply(this, arguments)
