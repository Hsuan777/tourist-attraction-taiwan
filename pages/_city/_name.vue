<template>
  <div>
    <figure class="banner banner__index magic-height-300 mb-15">
      <div class="container h-100 d-flex align-items-end pb-7">
        <div class="row justify-content-center w-100">
          <div class="col-md-10">
            <h1 class="text-white fz-huger">
              景點
            </h1>
          </div>
        </div>
      </div>
    </figure>
    <section class="container mb-10">
      <div class="row">
        <div class="col-md-6">
          <img
            v-if="tempData.Picture.PictureUrl1"
            :src="tempData.Picture.PictureUrl1"
            :alt="tempData.Picture.PictureDescription1"
            class="img magic-height-239 magic-height-387 rounded"
          >
          <p
            v-else
            class="
              img
              magic-height-239 magic-height-387
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
        </div>
        <div class="col-md-6">
          <h2 class="fz-larger mb-4">
            {{ tempData.Name }}
          </h2>
          <ul class="list-unstyled">
            <li class="mb-6">
              <h3 class="fz-medium d-flex align-items-center mb-2">
                <img src="~/static/icon/icon_location-red.svg" alt="icon_location" class="pe-2">
                <NuxtLink :to="`/${tempData.City}`">
                  {{ tempData.City }}
                </NuxtLink>
              </h3>
            </li>
            <li class="mb-6 ps-1">
              <h3 class="fz-medium d-flex align-items-center mb-2">
                <img src="~/static/icon/icon_label.svg" alt="icon_label" class="pe-3">
                標籤
              </h3>
              <p class="ps-8">
                <span
                  v-if="tempData.Class1"
                  class="bg-grey text-secondary py-1 px-2 me-1 rounded my-1"
                >
                  {{ tempData.Class1 }}
                </span>
                <span
                  v-if="tempData.Class2"
                  class="bg-grey text-secondary py-1 px-2 me-1 rounded my-1"
                >
                  {{ tempData.Class2 }}
                </span>
                <span
                  v-if="tempData.Class3"
                  class="bg-grey text-secondary py-1 px-2 me-1 rounded my-1"
                >
                  {{ tempData.Class3 }}
                </span>
              </p>
            </li>
            <li class="mb-6 ps-1">
              <h3 class="fz-medium d-flex align-items-center mb-2">
                <img src="~/static/icon/icon_time.svg" alt="icon_time" class="pe-3">
                開放時間
              </h3>
              <p class="ps-8">
                {{ tempData.OpenTime }}
              </p>
            </li>
            <li class="mb-8 ps-1">
              <h3 class="fz-medium d-flex align-items-center mb-2">
                <img src="~/static/icon/icon_article.svg" alt="icon_article" class="pe-3">
                簡介
              </h3>
              <p class="ps-8">
                {{ tempData.DescriptionDetail }}
              </p>
            </li>
            <li class="d-flex justify-content-center justify-content-md-start">
              <a
                :href="`tel:${tempData.Phone}`"
                class="btn btn-outline-danger d-flex align-items-center py-5 px-7 me-5 rounded-4"
              >
                <img src="~/static/icon/icon_phone.svg" alt="icon_phone" class="pe-1">
                {{ tempData.Phone }}
              </a>
              <a
                :href="tempData.WebsiteUrl"
                class="btn btn-danger py-5 px-17 rounded-4"
              >官方網站</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section class="container mb-15">
      <p class="fz-large mb-6 border-start border-primary border-4 ps-1">
        您可能會喜歡
      </p>
      <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4">
        <div v-for="item in randomData" :key="item.ID" class="col mb-3 mb-md-14 position-relative">
          <div class="border rounded-4 h-100">
            <NuxtLink :to="`/${item.City}/${item.Name}`" class="stretched-link link-secondary">
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
      tempData: {
        Picture: {},
      },
      otherData: [],
      randomData: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios
        .get(
          `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/?$filter=Name%20eq%20'${this.$route.params.name}'&$format=JSON`,
          {
            headers: this.getAuthorizationHeader(),
          },
        )
        .then((respons) => {
          this.tempData = { ...respons.data[0] };
          this.getOtherData();
        });
    },
    getOtherData() {
      const city = this.cities.filter((item) => item.name === this.tempData.City);
      this.$axios
        .get(
          `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${city[0].nameEn}?$format=JSON`,
          {
            headers: this.getAuthorizationHeader(),
          },
        )
        .then((res) => {
          this.otherData = res.data;
          this.randomJSONData();
        });
    },
    randomNumber(max, min) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    randomJSONData() {
      for (let x = 0; x < 4; x += 1) {
        const y = this.randomNumber(this.otherData.length, 0);
        this.randomData.push(this.otherData[y]);
        this.otherData.splice(y, 1);
      }
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
