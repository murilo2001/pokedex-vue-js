<template>
<div class="div-borda">
<table id="table-margin">
	<tbody>
		<tr>
			<td colspan="5">
                <h2>Evoluções</h2>
            </td>
		</tr>
		<tr>
			<td><img :src="imageEvo1" alt="" width="180" height="180"></td>
			<td><img src="/img-icon/seta.png" alt="" width="30" height="35"></td>
			<td><img :src="imageEvo2" alt="" width="180" height="180"></td>
			<td><img src="/img-icon/seta.png" alt="" width="30" height="35"></td>
			<td><img :src="imageEvo3" alt="" width="180" height="180"></td>
		</tr>
		<tr>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
	</tbody>
</table>
</div>
</template>

<script>

export default {
    props: {imageEvo1: String, imageEvo2: String, imageEvo3: String },
}
</script>
    
<style>

table , td, th {
	/* border: 1px solid #595959; */
	border-collapse: collapse;
}
td, th {
	padding: 3px;
	width: 30px;
	height: 25px;
}
th {
	background: #f0e6cc;
}
.even {
	background: #fbf8f0;
}
.odd {
	background: #fefcf9;
}  

.div-borda{
    border: 1px solid #595959;
    border-radius: 40px;
    margin-left: 2px;
}

</style>