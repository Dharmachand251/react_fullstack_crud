
  import { useEffect, useState } from 'react'
  import { getPost } from '../api/PostApi'
  export const  Posts = () => {


  console.log(getPost())
    const  [data, setData] = useState([]);
  const getPostData = async () => {
    const res = await getPost()
    //const res = 'Hello';
    setData(res.data)
    console.log(res)
  }

  useEffect(() => {
    getPostData();
  },[])

  return <section className='section-post'>
        <ol>
            {
                data.map((curEl) =>{
                    const {id,title,body}  = curEl
                    return <li key={id}>
                                {/* <p> {id} </p> */}
                                <p> { title }</p>
                                <p> { body } </p>
                                <button> Edit</button>
                                <button className='btn-delete'>Delete</button>
                        </li>
                })
            }
        </ol>
  </section>

  }