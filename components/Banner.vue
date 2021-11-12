<template>
  <figure
    class="banner magic-height-260 magic-height-md-400 mb-15"
    :class="`banner__${nowCategory.nameEn}`"
  >
    <div class="container h-100 d-flex align-items-end pb-7">
      <div class="row justify-content-center w-100 mt-18 mt-md-0">
        <div class="col-md-10">
          <p class="text-white fz-huger d-none d-md-block">
            {{ nowCategory.name }}
          </p>
          <ul class="list-unstyled d-flex mb-4">
            <li v-for="item in categories" :key="item.name">
              <button
                type="button"
                class="btn btns-lg rounded-pill d-flex align-items-center px-6 me-3"
                :class="item.nameEn === nowCategory.nameEn ? 'btn-danger' : ' btn-white'"
                @click="changeCategory(item.nameEn)"
              >
                {{ item.name }}
                <img
                  :src="`_nuxt/assets/icon/icon_${item.nameEn}-${
                    item.nameEn === nowCategory.nameEn ? 'white' : 'gery'
                  }.png`"
                  :alt="`icon_${item.nameEn}`"
                  class="ps-2"
                >
              </button>
            </li>
          </ul>
          <div class="row g-2">
            <div class="col-md-6">
              <select
                class="form-select py-3"
                aria-label="Default select example"
                @change="changeCity($event.target.value)"
              >
                <option selected>
                  選擇想去的地區
                </option>
                <option
                  v-for="(item, index) in cities"
                  :key="item.name + index"
                  :value="item.nameEn"
                  :selected="
                    item.name ===
                      `${$route.params.city === undefined ? '臺北市' : $route.params.city}`
                  "
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div class="col-md-6">
              <input
                v-model="cacheSearch"
                class="form-control text-secondary py-3"
                :placeholder="`輸入${nowCategory.name}名稱`"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </figure>
</template>
<script>
export default {
  data() {
    return {
      nowCategory: {
        name: '景點',
        nameEn: 'ScenicSpot',
      },
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
      cacheSearch: '',
    };
  },
  watch: {
    cacheSearch() {
      this.$emit('searchData', this.cacheSearch);
    },
  },
  methods: {
    changeCity(city) {
      this.$emit('changeCity', city);
    },
    changeCategory(category) {
      const tempData = this.categories.filter((item) => item.nameEn === category);
      this.nowCategory = { ...tempData[0] };
      this.$emit('changeCategory', this.nowCategory);
    },
  },
};
</script>
