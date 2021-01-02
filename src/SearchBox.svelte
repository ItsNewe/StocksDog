<script>

	import { createEventDispatcher } from "svelte";

	const dispatcher = createEventDispatcher();
	let searchBoxText;

	//Set promise as an unresovled promise until the form is submitter
	//What the fuck??
	let deferreds = [];
	let promise = new Promise(function(resolve, reject){
    	deferreds.push({resolve: resolve, reject: reject});
	});
	
	async function getStockData(){

		if(searchBoxText!=undefined){
			let r = await fetch(`https://api.twelvedata.com/stocks?symbol=${searchBoxText}`)
			.then(r=> { 
				if(r.ok){
					r.json().then(data => { 
						if(data["data"]){
							dispatcher("createChart", data["data"][0]["symbol"]);
						}
					 })
				}
			});
		}
			//.then( r => {return r.json()} )
			//.catch(r => {throw new Error(r.text())});
		}

	function stockFormSubmit(){
		promise = getStockData();
	}
</script>

<style>
	@tailwind base;
	form {
		display: flex;
	}
</style>

<main>
	<form class="searchBox" on:submit|preventDefault={stockFormSubmit}>
		<input bind:value={searchBoxText} />
		<button type="submit">Search symbol</button>
	</form>

	{#await promise}
		<p>Waiting</p>
	{:then r}
		<p>{r}</p>
	{:catch err}
		<p>Ouch: {err}</p>
	{/await}
</main>
