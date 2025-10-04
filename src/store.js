export const initialStore = () => {
  return {
    message: null,
    saludo: true,
    contactos: [],
    usuario: "",
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'add_task':

      const { id, color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

    case 'ACTUALIZAR_SALUDO':

      return {
        ...store,
        saludo: !store.saludo
      }

    case 'LISTA_CONTACTOS':

      return {
        ...store,
        contactos: action.payload
      }

    case 'NUEVO-USUARIO':

      return {
        ...store,
        usuario: action.payload
      }

    
    default:
      throw Error('Unknown action.')
      
    }
}
