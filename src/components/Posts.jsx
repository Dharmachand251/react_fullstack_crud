
  import { useEffect, useState } from 'react'
  import { getPost,deletePost } from '../api/PostApi'
  import {Form} from './Form'
  export const  Posts = () => {


  const  [data, setData] = useState([]);
  const  [updateDataApi, setUpdateDataApi] = useState({});
  const getPostData = async () => {
    const res = await getPost()
    //const res = 'Hello';
    setData(res.data)
    console.log(res)
  }

  useEffect(() => {
    getPostData();
  },[])

  const handleDelete = async (id) => {
    try {
        console.log(id)
        // Call delete API here
        const res = await deletePost(id);
        console.log(res)
        // Update the UI after deletion
        const filteredData = data.filter((item) => item.id !== id);
        setData(filteredData);

    } catch (error) {
        console.log(error)
    }
    
  }

  const handleEditForm = (curEl) => {
    console.log('Edit',curEl)
    setUpdateDataApi(curEl)
  }

  return (  
    <>
      <section className='section-form'>
        {/* <h1>List of Posts</h1> */}
        <Form  data={data} setData={setData} updateDataApi={updateDataApi} setUpdateDataApi={setUpdateDataApi} />
      </section>
      <section className='section-post'>
            <ol>
                {
                    data.map((curEl) =>{
                        const {id,title,body}  = curEl
                        return <li key={id}>
                                    {/* <p> {id} </p> */}
                                    <p> { title }</p>
                                    <p> { body } </p>
                                    <button onClick={() => handleEditForm(curEl)} > Edit</button>
                                    <button className='btn-delete' onClick={() => handleDelete(id)}>Delete</button>
                            </li>
                    })
                }
            </ol>
      </section>
      </>
  );

  }