(function() {

    const md2html = async (text) => {
        const sub = await Vditor.md2html(text, 'atom-one-light', true, {})
        return sub
    }
    $('#comment-input').on('focus', () => {
        // if (localStorage.userCode) {
        //     return
        // }
        $('#comment-input').blur()
        $.alert({
            title: '提示',
            content: '你还未登录，可从github登录',
            buttons: {
                github登录: function() {
                    window.location.href = 'https://github.com/login/oauth/authorize?client_id=6888e722d457574ca9d7'
                }
            }
        });
    })
    $('#commentSubmit').on('click', async () => {
        let inputContent = $('#comment-input').val()
        if (inputContent.replace(/ /g, '').length == 0) {
            // alert('请填写评论')
            $.alert({
                    title: '提示',
                content: '请填写评论',
            });
            return
        }
        
        const data = {
            article_id: article.id,
            user_id: localStorage.userCode,
            text: await md2html(inputContent)
        }
        $.ajax({
            type: "POST",
            url: "/api/comment",
            data,
            dataType: "json",
            success: function (response) {
                if (response.errno == 0) {
                    location.replace(location.href)
                }
                
            }
        });
    })
})()