<template>
	<div class="hello">
		<h2>地区性选择</h2>
		<div class="city_check_wrapp">
		<span>请输入城市</span><input type="text" v-model="cityInput">
	</div>
	<div class="city_wrapp" v-if="!isNewVal">
		<h6>热门城市（支持汉子/拼音/英文字母）</h6>
		<div class="citi_list">
			<ul class="city_title">
				<li v-for="item in cityData" @click="getCityList(item.tabname)">{{item.tabname}}</li>
			</ul>
			<div class="city_name">
				<div class="city_item" v-for="cityItem in cityItemData">
					<div v-if="cityItem.dt" class="left">{{cityItem.dt}}</div>
					<div class="name">
						<span v-for="cityName in cityItem.dd" @click="inputCityName(cityName)">{{cityName.cityName}}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
		<div class="city_list_wrap" v-if="isNewVal">
			<ul class="filter_list">
				<li v-for="item in filterCityList" @click="checkCityName(item.name)">
					<span>{{item.name}}</span><span>{{item.pinyin}}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'HelloWorld',
		data () {
			return {
				cityData: null,
				cityItemData:null,
				cityInput:null,
				isNewVal:false,
				cityList:[],
				filterCityList:[]
			}
		},
		created () {
			let that = this;
			// console.log(this.$pinyin.getFullChars('管理员'))  提取拼音并且首字母大写
			// console.log(this.$pinyin.getCamelChars('管理员'))  提取首字母并大写
			// console.log(this.$pinyin.getCamelChars('1234'))
			// console.log(this.$pinyin.getCamelChars('english'))
			let url = '../../static/data/city.json';
			this.$axios.get(url)
			.then(res => {
				let getCityData = res.data[267040].value.cityArray;
				this.cityData = getCityData;
				this.cityItemData = this.cityData[0].tabdata;
				let newCityData = this.cityData.slice(1);
				newCityData.forEach(function(item){
					item.tabdata.forEach(function(item){
						item.dd.forEach(function(item){
							let cityInfo = {};
							cityInfo.name = item.cityName;
							cityInfo.pinyin = that.$pinyin.getFullChars(item.cityName).toLowerCase();
							cityInfo.firstLetter = that.$pinyin.getCamelChars(item.cityName);
							that.cityList.push(cityInfo);
						})
					})
				})
			}).catch(error => {
					console.log(error);
			});
		},
		watch:{
			cityInput: function(newVal,oldVal){
				var re = /^[A-Z]+$/; //大字首字母
				var pinyinReg = /^[a-z]+$/;//拼音搜索
				// var re2 = /^[/\u4e00-\u9fa5]$/;
				var allCityArr = [];
				if(this.cityInput){
					console.log(111);
					var testStr = String(this.cityInput);
					if(re.test(testStr)){
						for(let i = 0; i < this.cityList.length; i++){
							if(this.cityList[i].firstLetter.indexOf(testStr)>=0){
								allCityArr.push(this.cityList[i]);
							}
						}
					} else if( pinyinReg.test(testStr) ){
						for(let m = 0; m < this.cityList.length; m++){
							if(this.cityList[m].pinyin.indexOf(testStr)>=0){
								allCityArr.push(this.cityList[m]);
							}
						}
					}else {
						for(let a = 0; a < this.cityList.length; a++){
							if(this.cityList[a].name.indexOf(testStr)>=0){
								allCityArr.push(this.cityList[a]);
							}
						}
					}
					this.filterCityList = allCityArr;
					this.isNewVal = true;
				}else {
						this.isNewVal = false;
				}
			}
		},
		methods:{
			getCityList:function(val) {
				let that = this;
				that.cityData.forEach(function(item,index){
					if(val == item.tabname){
						that.cityItemData = item.tabdata;
					};
				})
			},
			inputCityName:function(e){
				this.cityInput = e.cityName;
			},
			checkCityName:function(e){
				this.cityInput = e;
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
	font-weight: normal;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
.citi_list {
	width: 430px;
	margin: 0 auto;
}
.city_item {
	text-align: left;
	line-height: 40px;
}
.city_item div {
	display: inline-block;
	vertical-align: top;
}
.city_item div.name {
	width: 80%;
}
.city_item div.left {
	width: 5%;
	color: crimson;
}
.city_item div.name span{
	display: inline-block;
	width: 20%;
}
</style>
