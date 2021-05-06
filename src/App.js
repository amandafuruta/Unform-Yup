// disponivel em: https://www.youtube.com/watch?v=P65RJTTqkN4
// baixar o UNFORM npm i @unform/web @unform/core
// instalar o yup: npm add yup
// o yup vai ser usado para validações


import { Form } from '@unform/web'
import Input from './components/Form/input'
import { Scope } from '@unform/core'
import { useRef , useEffect} from 'react'
import * as Yup from 'yup'


// const initialData = {
//   //relação de chave - valor, onde a chave tem que ter o mesmo nome de name do input
//   email: 'aaft@gmail.com',
//   address: {
//     city: 'London'
//   }
// }

function App() {
  
  const formRef = useRef(null)

  async function handleSubmit(data, {reset}){
    // SEM O YUP:
    // function sem o async, sem o await
    // if(data.name === ''){
    //   /* PARA SETAR ERRO EM APENAS 1 CAMPO:  */
    //   // formRef.current.setFieldError(/*campo:*/ 'name', /*mensagem: */ 'O nome é obrigatório')

    //   /* PARA SETAR ERRO EM + DE 1 CAMPO */
    //   formRef.current.setErrors({
    //     name: 'nome obrigatório',
    //     address: {
    //       city: 'Cidade Obrigatória'
    //     }

    // COM O YUP: 
        try{
          const schema = Yup.object().shape({
            name: Yup.string().required('O nome é obrigatório'),
            email: Yup.string().email('Digite um email').required('email obrigatorio') ,
            address: Yup.object().shape({
              city: Yup.string().min(3,'No minimo 3 caracteres').required('Obrigatorio')
            })
          })

          await schema.validate(data,{
            abortEarly: false
          })
          
          console.log(data)

          formRef.current.setErrors({}) /*FAZ A LIMPEZA DOS ERROS */
          reset() /* RESETA OS CAMPOS DO FORMULÁRIO */
          
        } catch (err){
            if(err instanceof Yup.ValidationError){
              const errorMessages = {}

              err.inner.forEach(error => {
                errorMessages[error.path] = error.message
              })

              formRef.current.setErrors(errorMessages)
            }
        }
  }

  useEffect(() => {
    setTimeout(() => {
      formRef.current.setData({
        name: 'Autor Autor',
        email: 'autor@autor.com.br'
      })
    }, 2000)
  }, [])

  return (
    <div className="App">
      <h1>Teste</h1>
      <Form /*initialData={initialData}*/ ref={formRef} onSubmit={handleSubmit}>
        <Input name="name" />
        <Input name="email" type="email"/>
        <Input name="password" type="password"/>

        {/* Colocando um objeto na lista */}
        {/* <Input name="address.rua" />
        <Input name="address.numero" /> */}

        {/* para não ficar repetindo address */}
        <Scope path="address">
            <Input name="rua" />
            <Input name="numero" />
            <Input name="city" />
            <Input name="bairro" />
        </Scope>
        <button type="submit">Enviar</button>
      </Form>
    </div>
  );
}

export default App;
