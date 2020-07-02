<template>
  <div id="category">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>
      <div class="tab-content">
        <tab-content-category :subcategories="showSubcategory"></tab-content-category>
        <tab-control :titles="['综合','新品','销量']"
                     @itemClick="tabClick" class="tab-control"></tab-control>
        <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import TabMenu from './childComps/TabMenu'
  import TabContentCategory from './childComps/TabContentCategory'
  import TabControl from 'components/content/tabControl/TabControl'
  import TabContentDetail from './childComps/TabContentDetail'

  import {getCategory, getSubcategory, getCategoryDetail} from "network/category"
  import {POP, SELL, NEW} from "common/const"
  import {tabControlMixin} from "common/mixin"

  export default {
    name: "Category",
    components: {
      NavBar,
      TabMenu,
      TabContentCategory,
      TabControl,
      TabContentDetail
    },
    mixins: [tabControlMixin],
    data() {
      return {
        categories: [],
        categoryData: {},
        currentIndex: 0
      }
    },
    computed: {
      showSubcategory() {
        return Object.keys(this.categoryData).length !== 0 ? this.categoryData[this.currentIndex].subcategories : []
      },
      showCategoryDetail() {
        return Object.keys(this.categoryData).length !== 0 ? this.categoryData[this.currentIndex].categoryDetail[this.currentType] : []
      }
    },
    created() {
      this._getCategory()
    },
    mounted() {

    },
    methods: {
      //获取分类列表，初始化子数据
      _getCategory() {
        getCategory().then(res => {
          this.categories = res.data.category.list
          for (let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: [],
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          this._getSubcategories(0)
        })
      },
      //获取子分类数据
      _getSubcategories(index) {
        this.currentIndex = index
        const mailKey = this.categories[index].maitKey
        getSubcategory(mailKey).then(res => {
          this.categoryData[index].subcategories = res.data.list
          this.categoryData = {...this.categoryData}
          this._getCategoryDetail(POP)
          this._getCategoryDetail(SELL)
          this._getCategoryDetail(NEW)
        })
      },
      //获取商品数据
      _getCategoryDetail(type) {
        const miniWallkey = this.categories[this.currentIndex].miniWallkey
        getCategoryDetail(miniWallkey, type).then(res => {
          this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      },
      selectItem(index) {
        this._getSubcategories(index)
      }
    }
  }
</script>

<style scoped>
  #category {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .content {
    height: calc(100% - 44px - 49px);
    display: flex;
  }

  .tab-content {
    flex: 1;
    overflow: scroll;
  }

  .tab-control {
    position: sticky;
    top:0
  }
</style>
