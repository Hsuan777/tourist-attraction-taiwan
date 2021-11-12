<template>
  <div>
    <figure class="banner magic-height-300 mb-15" :class="`banner__${$route.params.category}`">
      <div class="container h-100 d-flex align-items-end pb-7">
        <div class="row justify-content-center w-100">
          <div class="col-md-10">
            <p class="text-white fz-huger">
              {{ categories.filter((item) => item.nameEn === $route.params.category)[0].name }}
            </p>
          </div>
        </div>
      </div>
    </figure>
    <Hotel v-if="`${$route.params.category === 'Hotel'}`" />
    <ScenicSpot v-else />
    <section class="container mb-15">
      <p
        v-if="randomData.length >= 4"
        class="fz-large mb-6 border-start border-primary border-4 ps-1"
      >
        您可能會喜歡
      </p>
      <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4">
        <div v-for="item in randomData" :key="item.ID" class="col mb-3 mb-md-14 position-relative">
          <div class="border rounded-4 h-100">
            <NuxtLink
              :to="`/${$route.params.category}/${item.City}/${item.Name}`"
              class="stretched-link link-secondary"
            >
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
                暫未提供
              </p>
            </NuxtLink>
            <div class="py-3 px-4">
              <h2 class="fz-medium mb-2">
                {{ item.Name }}
              </h2>
              <p class="text-primary mb-3 d-flex">
                <img src="~/assets/icon/icon_location.svg" alt="icon_location" class="pe-1">
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
import ScenicSpot from '../../../components/ScenicSpot.vue';
import Hotel from '../../../components/Hotel.vue';

export default {
  components: {
    ScenicSpot,
    Hotel,
  },
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
      categories: [
        {
          name: '景點',
          nameEn: 'ScenicSpot',
        },
        {
          name: '餐飲',
          nameEn: 'Restaurant',
        },
        {
          name: '旅宿',
          nameEn: 'Hotel',
        },
        {
          name: '活動',
          nameEn: 'Activity',
        },
      ],
      otherData: [],
      randomData: [],
    };
  },
  mounted() {
    this.getOtherData();
  },
  methods: {
    getOtherData() {
      const city = this.cities.filter((item) => item.name === this.$route.params.city);
      this.$axios
        .get(
          `https://ptx.transportdata.tw/MOTC/v2/Tourism/${this.$route.params.category}/${city[0].nameEn}?$format=JSON`,
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
        if (this.otherData.length < 4) {
          return;
        }
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
