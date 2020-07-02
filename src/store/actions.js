const actions = {
  addCart(context, info) {
    return new Promise((resolve, reject) => {
      const oldInfo = context.state.cartList.find(item => item.iid === info.iid)
      if (oldInfo) {
        context.commit('addCounter',oldInfo)
        resolve('当前商品数量+1')
      } else {
        info.count = 1
        info.checked = true
        context.commit('addToCart',info)
        resolve('添加了新的商品')
      }
    })
  }
}

export default actions
