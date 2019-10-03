
Vue.component('header-astralys',{
	template:`
		<nav class="navbar navbar-dark color-noir navbar-static-top navbar-expand-md">
        <div class="container">
            <button type="button" class="navbar-toggler collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false"> <span class="sr-only">Toggle navigation</span>
            </button> <a class="navbar-brand" href="#">Astralys</a>
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav mr-auto">
                    <li class="active nav-item"><a href="/" class="nav-link">Home</a>
                    </li>
                    <li class="nav-item"><a href="/sharks" class="nav-link">Game</a>
                    </li>
                    <li class="nav-item"><a href="/sharks" class="nav-link">Leaderboard</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

	`
});