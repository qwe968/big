$(function () {

  $('#link_reg').on('click', function () {
    $('.reg-box').show();
    $('.login-box').hide();
  })
  $('#link_login').on('click', function () {
    $('.reg-box').hide();
    $('.login-box').show();
  })



  // 从lay中获取form对象
  let form = layui.form
  let layer = layui.layer

  // 通过form.verify()函数自定义效验规则
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

    repwd: function (value) {
      let pwd = $('.reg-box [name=password]').val();
      if (pwd !== value) {
        return '两次密码输入不一致'
      }
    }
  })


  //监听表单的提交事件
  $('#form_reg').on('submit', function (e) {
    e.preventDefault();
    let data = {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val()
    }
    $.post('/api/reguser',
      data,
      function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('注册成功')
        $('#link_login').click()
      })
  })


  $('#form_login').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/api/login',
      // data: {
      //   username: $('#form_login [name=username]').val(),
      //   password: $('#form_login [name=password]').val()
      // },
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登陆失败')
        }
        layer.msg('登陆成功');
        localStorage.setItem('token', res.token)
        location.href = '/index.html'
      }
    })
  })
})                                      