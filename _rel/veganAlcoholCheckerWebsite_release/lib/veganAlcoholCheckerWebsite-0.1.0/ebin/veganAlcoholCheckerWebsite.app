{application, 'veganAlcoholCheckerWebsite', [
	{description, "New project"},
	{vsn, "0.1.0"},
	{modules, ['request_handler','veganAlcoholCheckerWebsite_app','veganAlcoholCheckerWebsite_sup']},
	{registered, [veganAlcoholCheckerWebsite_sup]},
	{applications, [kernel,stdlib,cowboy]},
	{mod, {veganAlcoholCheckerWebsite_app, []}},
	{env, []}
]}.