function onSubmit(e) {
    e.preventDefault();

    const prompt = document.querySelector('#prompt').value;
    const size = document.querySelector('#size').value;

    if(prompt === '') {
        alert('Please add some text');
        return;
    }
    document.querySelector('#image').src = '';
    generateImageRequest(prompt,size);
}

async function generateImageRequest(prompt,size) {
    const response = await fetch('/openai/generate-image',{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            prompt,
            size
        })
    });

    if(!response.ok) {
        throw new Error('That image could not be generated');
    }

    const data = await response.json();

    const imageUrl = data.data;

    document.querySelector('#image').src = imageUrl;
    document.querySelector('#prompt').value = '';
    document.querySelector('#size').value = 'small';
}

document.querySelector('#image-form').addEventListener('submit', onSubmit);