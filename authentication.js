const RavenStrategy = require('passport-raven').Strategy

module.exports = {
	init (passport, conf) {
		passport.use('raven', 
			new RavenStrategy({
                          audience: 'https://ccmm.wiki',
			  desc: 'CCMM Wiki',
			  msg: 'We need to check you are a current student',
                          debug: false
			}, async (crsid, params, cb) => {
			 	try {
					const user = await WIKI.models.users.processProfile({
						profile: {
							id: crsid,
							email: crsid + '@cam.ac.uk',
							picture: ''
						},
						providerKey: 'raven'
					})
					console.log(user)
					cb(null, user)
				} catch (err) {
					cb(err, null)
			  	}
				}
			)
		)
	}
}	
