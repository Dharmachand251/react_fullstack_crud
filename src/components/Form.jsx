import { useEffect, useState } from "react";
import { createPost, updatePost } from "../api/PostApi";

export const Form = ({data,setData, updateDataApi,setUpdateDataApi}) => {

    const [formData, setFormData] = useState({
        title: '',
        body: ''
    });
    let isEmpty = Object.keys(updateDataApi).length === 0;

    useEffect(() => {
        if(Object.keys(updateDataApi).length > 0){
            setFormData({
                title: updateDataApi.title,
                body: updateDataApi.body
            })
        }
    },[updateDataApi])  

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const addPostData = async () => {
        try {
           
            const res = await createPost(formData);
            console.log('check',res);
            if(res.status == 201){
                // Update the UI with the new post
                setData([res.data, ...data]);
                // Clear the form
                setFormData({ title: '', body: '' });
            }
            
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const updatePostData = async () => {
        try {
            // Call update API here
            console.log('Update API call')
            const res = await updatePost(updateDataApi.id, formData);
            if(res.status == 200){
                // Update the UI with the updated post
                const updatedData = data.map((item) => 
                    item.id === updateDataApi.id ? res.data : item
                );
                setData(updatedData);   
            }
            // After successful update, you might want to refresh the post list or update the specific post in the state.
            // For simplicity, let's just clear the form and reset updateDataApi
            setFormData({ title: '', body: '' });
            setUpdateDataApi({});
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
        let action  = e.nativeEvent.submitter.value
        if(action === 'Update'){
            // Call update API here  
            updatePostData()
        }else{  
            // Call add API here
            addPostData()
        }
        
    };



    

    return (
        <div>
            {/* <h2>Form Component</h2> */}
            {/* Add your form elements here */}
            <form onSubmit={handleFormSubmit}>
                <input type="text" id="title" value={formData.title} onChange={handleChange}  name="title" placeholder="Title" />
                <textarea id="body" name="body" value={formData.body} onChange={handleChange} placeholder="Body"></textarea>
                <button type="submit" value={isEmpty ? 'Add' : 'Update'}> {isEmpty ? 'Add' : 'Update'} </button>
            </form>
        </div>
    );
}
