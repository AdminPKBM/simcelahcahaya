document.getElementById('askButton').addEventListener('click', async function () {
  const question = document.getElementById('question').value.trim();
  const responseDiv = document.getElementById('response');
  const askButton = document.getElementById('askButton');

  if (!question) {
    responseDiv.innerHTML = "<span style='color:yellow'>Silakan isi pertanyaan terlebih dahulu.</span>";
    return;
  }

  askButton.disabled = true;
  responseDiv.innerHTML = "<span class='loading'>⏳ Menjawab...</span>";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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" // GANTI API KEY DISINI
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: question }]
      })
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      responseDiv.innerText = data.choices[0].message.content;
    } else {
      responseDiv.innerHTML = "<span style='color:orange'>Jawaban tidak tersedia.</span>";
    }
  } catch (error) {
    responseDiv.innerHTML = "<span style='color:red'>❌ Terjadi kesalahan: " + error.message + "</span>";
  } finally {
    askButton.disabled = false;
  }
});
