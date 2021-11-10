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
          </div>
        </div>
      </div>
    </figure>
    <!-- 我的最愛 -->
    <section class="container mb-5">
      <p class="fz-large mb-6 border-start border-primary border-4 ps-1">
        我的最愛
      </p>
      <ul
        v-if="tempAllData.length > 0"
        class="list-unstyled row row-cols-1 row-cols-md-3 row-cols-lg-4"
      >
        <li v-for="item in finalDisplayData" :key="item.ID" class="col mb-3 mb-md-14">
          <div class="border rounded-4 h-100 position-relative">
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
            <button
              type="button"
              class="btn btn-link position-absolute top-5 end-5 zi-9 p-2 bg-white rounded-circle"
              @click="setLocalStorage(item.ID)"
            >
              <img
                v-if="localStorageAttractionsID.indexOf(item.ID) === -1"
                src="~/static/icon/icon_like.svg"
                alt="icon_like"
              >
              <img v-else src="~/static/icon/icon_like-1.svg" alt="icon_like">
            </button>
          </div>
        </li>
      </ul>
      <div v-else>
        <p>還沒有加入任何最愛喔!</p>
        <NuxtLink to="/">
          點此回首頁
        </NuxtLink>
      </div>
    </section>
    <div class="d-flex justify-content-center mb-18">
      <Page :pages="totalPages" :current-page="currentPage" @display-page="changeDisplayData" />
    </div>
  </div>
</template>

<script>
import JsSHA from 'jssha';
import Page from '../components/Pagination.vue';

export default {
  components: {
    Page,
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
      tempAllData: [],
      totalPages: 0,
      currentPage: 1,
      finalDisplayData: [],
      cacheSearch: '',
      localStorageAttractionsID: [],
    };
  },
  computed: {
    filterData() {
      return this.tempAllData.filter((item) => item.Name.match(this.cacheSearch));
    },
  },
  watch: {
    cacheSearch() {
      this.totalPages = Math.ceil(this.filterData.length / 32);
      this.changeDisplayData();
    },
  },
  mounted() {
    this.localStorageAttractionsID = this.$localStorage.get('myFavorite') || [];
    this.localStorageAttractionsID.forEach((item) => {
      this.getData(item);
    });
  },
  methods: {
    getData(attractionsID) {
      this.$axios
        .get(
          `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$filter=ID%20eq%20'${attractionsID}'&$format=JSON`,
          {
            headers: this.getAuthorizationHeader(),
          },
        )
        .then((respons) => {
          this.tempAllData.push(respons.data[0]);
          this.totalPages = Math.ceil(this.tempAllData.length / 32);
          this.changeDisplayData();
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
    changeDisplayData(page = 1) {
      const n = 32;
      const data = this.filterData;
      this.currentPage = page;
      this.finalDisplayData = data.slice(n * page - n, n * page);
    },
    setLocalStorage(item) {
      if (this.localStorageAttractionsID[0]) {
        let dataIndex = null;
        this.localStorageAttractionsID.forEach((attractionsID, index) => {
          if (attractionsID === item) {
            dataIndex = index;
          }
        });
        if (dataIndex === null) {
          this.localStorageAttractionsID.push(item);
          this.$localStorage.set('myFavorite', this.localStorageAttractionsID);
        } else {
          this.localStorageAttractionsID.splice(dataIndex, 1);
          this.tempAllData.splice(dataIndex, 1);
          this.changeDisplayData();
          this.$localStorage.set('myFavorite', this.localStorageAttractionsID);
        }
      } else {
        this.localStorageAttractionsID.push(item);
        this.$localStorage.set('myFavorite', this.localStorageAttractionsID);
      }
    },
  },
};
</script>
