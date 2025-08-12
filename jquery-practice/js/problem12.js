$(function() {
    const inputGroup = `
        <div class="input-group">
            <input type="text" name="name" placeholder="名前" />
            <input type="email" name="email" placeholder="メール" />
        </div>
    `;

    // 「追加」ボタン押下時に入力欄を追加
    $('#addInput').click(function() {
        $('#dynamicForm').append(inputGroup);
    });

    $('#submitForm').click(function(e) {
        e.preventDefault();
        $('#errorMsg').text('');

        let isValid = true;
        const data = [];

        $("#dynamicForm .input-group").each(function() {
            const name = $(this).find("input[name='name']").val();
            const email = $(this).find("input[name='email']").val();

            if (!name || !email) {
                isValid = false;
                return false;
            }
            data.push({ name, email });
        })
        if (!isValid) {
            $("#errorMsg").text("すべての名前とメールを入力してください。");
            return;
        }
        console.log(JSON.stringify(data));
        alert("送信成功！コンソールを確認してください。");
    })
})