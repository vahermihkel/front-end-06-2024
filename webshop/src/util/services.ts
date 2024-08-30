export const fetchData = (url: string) => {
  return fetch('https://fakestoreapi.com/products')
    .then(res => {
        return res.json();
    }) 
}