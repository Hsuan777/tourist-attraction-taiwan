<template>
  <div>
    <!-- banner -->
    <Banner
      @changeCategory="selectCatagory"
      @changeCity="getAttractionsData"
      @searchData="getSearchData"
    />
    <!-- 搜尋結果 -->
    <section class="container mb-5">
      <p class="fz-large mb-6 border-start border-primary border-4 ps-1">
        搜尋結果
      </p>
      <ul class="list-unstyled row row-cols-1 row-cols-md-3 row-cols-lg-4">
        <li v-for="item in finalDisplayData" :key="item.ID" class="col mb-3 mb-md-14">
          <div class="card--hover shadow border rounded-4 h-100 position-relative">
            <div class="row g-0">
              <div class="col-6 col-md-12">
                <NuxtLink
                  :to="`/${cacheCatagory.nameEn}/${item.City}/${item.Name}`"
                  class="stretched-link link-secondary"
                >
                  <img
                    v-if="item.Picture.PictureUrl1"
                    :src="item.Picture.PictureUrl1"
                    :alt="item.Picture.PictureDescription1"
                    class="img img__card magic-height-150 magic-height-md-190"
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
              </div>
              <div class="col-6 col-md-12">
                <div class="py-4 px-2 px-md-4">
                  <h2 class="fz-medium mb-1 mb-md-2 text-truncate">
                    {{ item.Name }}
                  </h2>
                  <p class="text-primary mb-2 mb-md-3 d-flex">
                    <img src="~/assets/icon/icon_location.svg" alt="icon_location" class="pe-1">
                    {{ item.City }}
                  </p>
                  <p class="d-flex flex-wrap">
                    <span
                      v-if="item.Class1"
                      class="bg-grey text-secondary py-md-1 px-1 px-md-2 me-1 rounded my-1"
                    >
                      {{ item.Class1 }}
                    </span>
                    <span
                      v-if="item.Class2"
                      class="bg-grey text-secondary py-md-1 px-1 px-md-2 me-1 rounded my-1"
                    >
                      {{ item.Class2 }}
                    </span>
                    <span
                      v-if="item.Class3"
                      class="bg-grey text-secondary py-md-1 px-1 px-md-2 me-1 rounded my-1"
                    >
                      {{ item.Class3 }}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <button
              type="button"
              class="
                btn btn-link
                position-absolute
                top-65 top-md-5
                end-5
                zi-9
                p-2
                bg-white
                rounded-circle
                border
                shadow-sm
              "
              @click="setLocalStorage(item.ID)"
            >
              <img
                v-if="localStorageAttractionsID.indexOf(item.ID) === -1"
                src="~/assets/icon/icon_like.svg"
                alt="icon_like"
              >
              <img v-else src="~/assets/icon/icon_like-1.svg" alt="icon_like">
            </button>
          </div>
        </li>
      </ul>
    </section>
    <div class="d-flex justify-content-center mb-18">
      <Page :pages="totalPages" :current-page="currentPage" @display-page="changeDisplayData" />
    </div>
  </div>
</template>

<script>
import JsSHA from 'jssha';
import Page from '../components/Pagination.vue';
import Banner from '../components/Banner.vue';

export default {
  components: {
    Page,
    Banner,
  },
  data() {
    return {
      tempAllData: [],
      totalPages: 10,
      currentPage: 1,
      finalDisplayData: [],
      cacheSearch: '',
      cacheCatagory: {
        name: '景點',
        nameEn: 'ScenicSpot',
      },
      cacheCity: 'Taipei',
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
    this.selectCatagory(this.cacheCatagory);
    this.localStorageAttractionsID = this.$localStorage.get('myFavorite') || [];
  },
  methods: {
    getAttractionsData(city) {
      this.cacheSearch = '';
      this.cacheCity = city;
      this.$axios
        .get(
          `https://ptx.transportdata.tw/MOTC/v2/Tourism/${this.cacheCatagory.nameEn}/${city}?$format=JSON`,
          {
            headers: this.getAuthorizationHeader(),
          },
        )
        .then((respons) => {
          this.tempAllData = respons.data;
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
    getSearchData(value) {
      this.cacheSearch = value;
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
          this.$localStorage.set('myFavorite', this.localStorageAttractionsID);
        }
      } else {
        this.localStorageAttractionsID.push(item);
        this.$localStorage.set('myFavorite', this.localStorageAttractionsID);
      }
    },
    selectCatagory(value) {
      this.cacheCatagory = value;
      this.getAttractionsData(this.cacheCity);
    },
  },
};
</script>
