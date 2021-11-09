<template>
  <div>
    <!-- banner -->
    <figure class="banner banner__index magic-height-260 magic-height-md-400 mb-15">
      <div class="container h-100 d-flex align-items-end pb-7">
        <div class="row justify-content-center w-100">
          <div class="col-md-10">
            <h1 class="text-white fz-huger">
              景點
            </h1>
            <ul class="list-unstyled mb-4">
              <li>
                <button
                  type="button"
                  class="btn btn-lg btn-danger rounded-pill d-flex align-items-center px-6"
                >
                  景點
                  <img
                    src="../static/icon/icon_attractions.svg"
                    alt="icon_attractions"
                    class="ps-2"
                  >
                </button>
              </li>
            </ul>
            <form action="" class="row g-2">
              <div class="col">
                <select
                  class="form-select py-3"
                  aria-label="Default select example"
                  @change="getData($event.target.value)"
                >
                  <option selected>
                    選擇想去的地區
                  </option>
                  <option
                    v-for="(item, index) in cities"
                    :key="item.name + index"
                    :value="item.nameEn"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </div>
              <div class="col">
                <input class="form-control text-secondary py-3" placeholder="輸入景點名稱">
              </div>
              <div class="col-2">
                <button type="submit" class="btn btn-danger d-flex align-items-center py-3 px-10">
                  <img src="../static/icon/icon_search.svg" alt="icon_search">
                  搜尋
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </figure>
    <!-- 搜尋結果 -->
    <section class="container">
      <p class="fz-large mb-6 border-start border-primary border-4 ps-1">
        搜尋結果
      </p>
      <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4">
        <div v-for="item in tempData" :key="item.ID" class="col mb-3 mb-md-14 position-relative">
          <div class="border rounded-4 h-100">
            <NuxtLink :to="`/${item.Name}`" class="stretched-link link-secondary">
              <img
                v-if="item.Picture.PictureUrl1"
                :src="item.Picture.PictureUrl1"
                :alt="item.Picture.PictureDescription1"
                class="img img__card magic-height-128 magic-height-md-190"
              >
              <p
                v-else
                class="
                  img img__card
                  magic-height-128 magic-height-md-190
                  bg-grey
                  text-secondary
                  fz-large
                  d-flex
                  justify-content-center
                  align-items-center
                "
              >
                景點
              </p>
            </NuxtLink>
            <div class="py-3 px-4">
              <h2 class="fz-medium mb-2">
                {{ item.Name }}
              </h2>
              <p class="text-primary mb-3 d-flex">
                <img src="~/static/icon/icon_location.svg" alt="icon_location" class="pe-1">
                {{ item.City }}
              </p>
              <p class="d-flex flex-wrap">
                <span v-if="item.Class1" class="bg-grey text-secondary py-1 px-2 me-1 rounded my-1">
                  {{ item.Class1 }}
                </span>
                <span v-if="item.Class2" class="bg-grey text-secondary py-1 px-2 me-1 rounded my-1">
                  {{ item.Class2 }}
                </span>
                <span v-if="item.Class3" class="bg-grey text-secondary py-1 px-2 me-1 rounded my-1">
                  {{ item.Class3 }}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import JsSHA from 'jssha';

export default {
  data() {
    return {
      cities: [
        {
          name: '臺北市',
          nameEn: 'Taipei',
        },
        {
          name: '新北市',
          nameEn: 'NewTaipei',
        },
        {
          name: '桃園市',
          nameEn: 'Taoyuan',
        },
        {
          name: '臺中市',
          nameEn: 'Taichung',
        },
        {
          name: '臺南市',
          nameEn: 'Tainan',
        },
        {
          name: '高雄市',
          nameEn: 'Kaohsiung',
        },
        {
          name: '基隆市',
          nameEn: 'Keelung',
        },
        {
          name: '新竹市',
          nameEn: 'Hsinchu',
        },
        {
          name: '新竹縣',
          nameEn: 'HsinchuCounty',
        },
        {
          name: '苗栗縣',
          nameEn: 'MiaoliCounty',
        },
        {
          name: '彰化縣',
          nameEn: 'ChanghuaCounty',
        },
        {
          name: '南投縣',
          nameEn: 'NantouCounty',
        },
        {
          name: '雲林縣',
          nameEn: 'YunlinCounty',
        },
        {
          name: '嘉義縣',
          nameEn: 'ChiayiCounty',
        },
        {
          name: '嘉義市',
          nameEn: 'Chiayi',
        },
        {
          name: '屏東縣',
          nameEn: 'PingtungCounty',
        },
        {
          name: '宜蘭縣',
          nameEn: 'YilanCounty',
        },
        {
          name: '花蓮縣',
          nameEn: 'HualienCounty',
        },
        {
          name: '臺東縣',
          nameEn: 'TaitungCounty',
        },
        {
          name: '金門縣',
          nameEn: 'KinmenCounty',
        },
        {
          name: '澎湖縣',
          nameEn: 'PenghuCounty',
        },
        {
          name: '連江縣',
          nameEn: 'LienchiangCounty',
        },
      ],
      tempData: {},
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData(city = 'Taipei') {
      this.isLoading = true;
      this.$axios
        .get(
          `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${city}?$top=30&$format=JSON`,
          {
            headers: this.getAuthorizationHeader(),
          },
        )
        .then((respons) => {
          this.tempData = respons.data;
        });
    },
    getAuthorizationHeader() {
      const AppID = '3209d3c409014e8cb42b5e83f861c102';
      const AppKey = 'qd4_Nh2b30-edGu3vXmbDzaWTFU';
      const GMTString = new Date().toGMTString();
      const ShaObj = new JsSHA('SHA-1', 'TEXT');
      ShaObj.setHMACKey(AppKey, 'TEXT');
      ShaObj.update(`x-date: ${GMTString}`);
      const HMAC = ShaObj.getHMAC('B64');
      const Authorization = `hmac username="${AppID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`;
      return { Authorization, 'X-Date': GMTString };
    },
  },
};
</script>
