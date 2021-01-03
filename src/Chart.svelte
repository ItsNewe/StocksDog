<script>
	import ApexCharts from "apexcharts";
	import { onMount } from "svelte";
	import {finnhubSb} from './tokens.js'
	export let chartId;
	export let stockName;
	let canvas;

	let liveData = [];

	async function refreshData() {
		await fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${stockName}&resolution=M&from=${Math.floor((Date.now()/1000)-(3600*156))}&to=${Math.floor(Date.now()/1000)}&token=${finnhubSb}`)
			.then((r) => {
				r.json().then((data) => {
					//This is horrible iteration and i'm ashamed of it
					let dataBuffer=[];
					
					for(const[idx, v] of data["c"].entries()){
						dataBuffer.push({
							'x':new Date(Date.UTC('2020','01','01'+idx,'23','31','30')),
							'y':[
							data["o"][idx],
							data["h"][idx],
							data["l"][idx],
							data["c"][idx]]
						}
						);
					};
					liveData=dataBuffer;
				});
			})
			.catch("error upon data retrieval");
	}

	onMount(async () => {
		await refreshData();
		

	var options = {
		series: [
			{
				data: liveData
			}
		],

		chart: {
			type: "candlestick",
			height: 350,
			width: "100%",
		},

		title: {
			text: stockName,
			align: "left",
		},

		xaxis: {
			type: "datetime",
		},

		yaxis: {
			tooltip: {
				enabled: true,
			},
		},
	};
	var chart = new ApexCharts(canvas, options);
	chart.render();
	
	setInterval(()=>{console.log(liveData); chart.updateSeries([{data:liveData}])}, 8000);
	});
</script>

<main>
	{#if !liveData}
		<p>LOADING...</p>
	{:else}
		<div bind:this={canvas} id={chartId} />
	{/if}
</main>
