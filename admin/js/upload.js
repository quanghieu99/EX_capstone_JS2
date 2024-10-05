async function uploadImage(){
    const fileInput = document.getElementById('image');
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'uploadByMe'); 

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dxqh3xpza/image/upload`;

    try {
        const response = await fetch(cloudinaryUrl, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        // Hiển thị ảnh đã upload
        console.log('Image URL:', data.secure_url); // URL của ảnh đã upload
        return data.secure_url;
    } catch (error) {
        return null;
    }
}