const fetchApi = (setRows, setLoading) => {
    fetch('https://jsonplaceholder.typicode.com/photos?_limit=100')
        .then(response => response.json())
        .then(data => setRows(data))
        .finally(() => {
            setLoading(false);
        })
}
export default fetchApi;