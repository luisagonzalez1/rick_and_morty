export default function SearchBar({onSearch}) {
   console.log("####", onSearch)
   return (
      <div>
         <input type='search' />
         <button onClick={()=>onSearch("not found id")}>Agregar</button> 
      </div>
   );
}
