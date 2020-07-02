<template>
  <div id="user-info">
    <a href="#" class="clear-fix">
      <slot name="user-icon">
        <img src="~assets/img/profile/user.svg" alt="" class="privateImage-svg left">
      </slot>
      <div class="login-info left">
        <slot name="user-nickname">
          <div>登录/注册</div>
        </slot>
        <div class="phone">
          <span>
            <img src="~assets/img/profile/phone.svg" alt="" class="icon-mobile left">
          </span>
          <slot name="user-phone">暂无绑定手机号</slot>
        </div>
      </div>
      <img src="~assets/img/profile/arrow.svg" alt="" class="arrow-svg right">
    </a>
  </div>
</template>

<script>
	export default {
		name: "UserInfo"
	}
</script>

<style scoped>
  #user-info {
    background-color: var(--color-tint);
    padding: 15px;
    margin-top: -5px;
  }

  #user-info .privateImage-svg {
    width: 60px;
    height: 60px;
    background-color: #fff;
    border-radius: 30px;
  }

  #user-info .arrow-svg {
    width: 18px;
    height: 26px;
    margin-top: 16px;
  }

  #user-info .login-info {
    color: #fff;
    margin: 10px 0 0 10px;
  }

  #user-info .login-info .phone {
    font-size: 13px;
    margin-top: 5px;
    margin-left: 15px;
    font-weight: 300;
    height: 24px;
    line-height: 24px;
  }

  #user-info .login-info .phone .icon-mobile {
    width: 18px;
    height: 24px;
  }
</style>
