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
        我是诚实列表
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
        isNewVal:false
    }
  },
  created () {
	  let url = '../../static/data/city.js';
	  this.$axios.get(url)
	  .then(res => {
		  let getCityData = res.data[267040].value.cityArray;
		  this.cityData = getCityData;
		  this.cityItemData = this.cityData[0].tabdata;
	  }).catch(error => {
		  console.log(error);
	  });
      this.$watch('cityInput',(newVal) => {
            if(newVal.length&&newVal.length > 0){
                var re = /[A-Za-z]+$/;
                var re2 = /^[/\u4e00-\u9fa5]$/;

                if(re.test(newVal)){
                    let lowerVal = newVal.toLowerCase();
                    for(var i = 1; i < this.cityData.length; i ++){
                        this.cityData[i].tabdata.forEach(function(item){
                            console.log(item.dd);
                        });
                    }
                }else if(re2.test(newVal)){
                    console.log('我是中文')
                }
                this.isNewVal = true;
            }else {
                this.isNewVal = false;
            }
      })
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
