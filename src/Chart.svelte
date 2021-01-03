<script>
	import ApexCharts from "apexcharts";
	import { onMount } from "svelte";
	import {finnhubSb} from './tokens.js'
	export let chartId;
	export let stockName;
	let canvas;

	let liveData = [];

	async function refreshData() {
		await fetch(`http://localhost:3357/candle?symbol=${stockName}`)
			.then((r) => {
				r.json().then((data) => {
					liveData=Data
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
	
	setInterval(()=>chart.updateSeries([{data:liveData}]), 8000);
	});
</script>

<main>
	{#if !liveData}
		<p>LOADING...</p>
	{:else}
		<div bind:this={canvas} id={chartId} />
	{/if}
</main>
