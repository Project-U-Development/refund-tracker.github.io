const select = document.querySelector('select');
select.addEventListener('change', function(){
	console.log(this.value);
});
  select.addEventListener('click', function() {
    console.log(select.value);
    console.log(select.selectIndex);
    
  });