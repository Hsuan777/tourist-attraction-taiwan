<template>
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
          旅宿
        </p>
      </div>
      <div class="col-md-6 position-relative bg-white rounded">
        <div class="px-5 pt-4 pb-6">
          <NuxtLink :to="`/`" class="text-secondary text-decoration-none pe-1">
            HOME / {{ tempData.City }}
          </NuxtLink>
          <h2 class="fz-larger mb-4">
            {{ tempData.Name }}
          </h2>
          <ul class="list-unstyled">
            <li class="mb-6">
              <h3 class="fz-medium d-flex align-items-center mb-2">
                <img src="~/assets/icon/icon_location-red.svg" alt="icon_location" class="pe-2">
                <a
                  :href="`https://www.google.com/maps/place/${tempData.Position.PositionLat},${tempData.Position.PositionLon}`"
                  target="_blank"
                >Google 地圖</a>
              </h3>
            </li>
            <li class="mb-6 ps-1">
              <h3 class="fz-medium d-flex align-items-center mb-2">
                <img src="~/assets/icon/icon_label.svg" alt="icon_label" class="pe-3">
                標籤
              </h3>
              <p v-if="tempData.Class" class="ps-8">
                <span
                  v-if="tempData.Class"
                  class="bg-grey text-secondary py-1 px-2 me-1 rounded my-1"
                >
                  {{ tempData.Class }}
                </span>
              </p>
              <p v-else class="ps-8">
                暫未提供
              </p>
            </li>
            <li class="mb-6 ps-1">
              <h3 class="fz-medium d-flex align-items-center mb-2">
                <img src="~/assets/icon/icon_time.svg" alt="icon_time" class="pe-3">
                開放時間
              </h3>
              <p v-if="tempData.OpenTime" class="ps-8">
                {{ tempData.OpenTime }}
              </p>
              <p v-else class="ps-8">
                暫未提供
              </p>
            </li>
            <li class="mb-8 ps-1">
              <h3 class="fz-medium d-flex align-items-center mb-2">
                <img src="~/assets/icon/icon_article.svg" alt="icon_article" class="pe-3">
                簡介
              </h3>
              <p v-if="tempData.Description" class="ps-8">
                {{ tempData.Description }}
              </p>
              <p v-else class="ps-8">
                暫未提供
              </p>
            </li>
            <li class="d-flex justify-content-center justify-content-md-start">
              <a
                :href="`tel:${tempData.Phone}`"
                class="btn btn-outline-danger d-flex align-items-center py-5 px-7 me-5 rounded-4"
              >
                <img src="~/assets/icon/icon_phone.svg" alt="icon_phone" class="pe-1">
                <span v-if="tempData.Phone">{{ tempData.Phone }}</span>
                <span v-else>暫未提供</span>
              </a>
              <a
                :href="tempData.WebsiteUrl"
                class="btn btn-danger py-5 px-17 rounded-4"
              >官方網站</a>
            </li>
          </ul>
          <button
            type="button"
            class="
              btn btn-link
              position-absolute
              top-3
              end-5
              zi-9
              p-2
              bg-white
              rounded-circle
              border
              shadow-sm
            "
            @click="setLocalStorage(tempData.ID)"
          >
            <img
              v-if="localStorageID.indexOf(tempData.ID) === -1"
              src="~/assets/icon/icon_like.svg"
              alt="icon_like"
            >
            <img v-else src="~/assets/icon/icon_like-1.svg" alt="icon_like">
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import JsSHA from 'jssha';

export default {
  data() {
    return {
      tempData: {
        Picture: {},
        Position: {},
      },
      localStorageID: [],
    };
  },
  mounted() {
    this.getData();
    this.localStorageID = this.$localStorage.get(`myFavorite-${this.$route.params.category}`) || [];
  },
  methods: {
    getData() {
      this.$axios
        .get(
          `https://ptx.transportdata.tw/MOTC/v2/Tourism/${this.$route.params.category}/?$filter=Name%20eq%20'${this.$route.params.name}'&$format=JSON`,
          {
            headers: this.getAuthorizationHeader(),
          },
        )
        .then((respons) => {
          this.tempData = { ...respons.data[0] };
        });
    },
    setLocalStorage(item) {
      if (this.localStorageID[0]) {
        let dataIndex = null;
        this.localStorageID.forEach((attractionsID, index) => {
          if (attractionsID === item) {
            dataIndex = index;
          }
        });
        if (dataIndex === null) {
          this.localStorageID.push(item);
          this.$localStorage.set(`myFavorite-${this.$route.params.category}`, this.localStorageID);
        } else {
          this.localStorageID.splice(dataIndex, 1);
          this.$localStorage.set(`myFavorite-${this.$route.params.category}`, this.localStorageID);
        }
      } else {
        this.localStorageID.push(item);
        this.$localStorage.set(`myFavorite-${this.$route.params.category}`, this.localStorageID);
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
