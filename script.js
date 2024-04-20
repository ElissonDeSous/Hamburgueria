const Menu = document.getElementById("menu");
const Carrinho =  document.getElementById("carrinhoBotao");
const Modal = document.getElementById("carrinhoModal");
const cartItem = document.getElementById("cart-items");
const CarrinhoTotal = document.getElementById("cart-total");
const checkout = document.getElementById("checkout");
const fecharModal = document.getElementById("close-modal");
const CountCart = document.getElementById("cart-count");
const Endereço = document.getElementById("Endereço");
const erro = document.getElementById("error");


let carrinho = []



     // abrir o modal do carrinho
    Carrinho.addEventListener("click", ()=>{
        updateCartModal();
        Modal.style.display = "flex"
    })

     //fechar o modal clicando pra fora da janela
    Modal.addEventListener("click", (event)=>{
         if(event.target === Modal){
            Modal.style.display = "none"
            
         }
    })
    // fechando o modal  clicando no botao fechar
    fecharModal.addEventListener("click", ()=>{
        Modal.style.display = 'none'
    })


    Menu.addEventListener('click',(event)=>{
         // console.log(event.target)
         let parentButton = event.target.closest(".botaoCarrinho")
        if(parentButton){
            const name = parentButton.getAttribute("data-name")
            const preço = parseFloat(parentButton.getAttribute("data-price"))
            // adicionar no carrinho
            addToCart(name,preço)
        }
    })

    // função para adicionar no carrinho

    function addToCart(name,preço){

        let itemExistente = carrinho.find(item=>item.name === name)
        if(itemExistente){
            // se o item ja existe aumenta a quantidade 

            itemExistente.quantidade += 1
        }else{
            carrinho.push({
                name,
                preço,
                quantidade: 1,
            })
    
        }
       
        updateCartModal()
    }

     function updateCartModal(){
       cartItem.innerHTML = ""
       let total = 0;

       carrinho.forEach(item=>{
           const cartItemElement = document.createElement("div")
           cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col");
           cartItemElement.innerHTML = `
            <div class="flex items-center justify-between">
               <div>
                <p class="font-medium">${item.name}</p>
                <p>${item.quantidade}</p>
                <p class="font-medium mb-2 ">${item.preço.toFixed(2)}</p>
               </div>

        
               <button class="remover" data-name = "${item.name}">Remover</button>
              
            </div>
           `
           total += item.preço * item.quantidade;
           cartItem.appendChild(cartItemElement)
       })

       CarrinhoTotal.textContent = total.toLocaleString("pt-BR",{
             style: "currency",
             currency: "BRL"
       })

       CountCart.innerHTML = carrinho.length;
     }

     // função para remover o item do carrinho

     cartItem.addEventListener("click" , (event)=>{
    if(event.target.classList.contains("remover"))
    {
        const name = event.target.getAttribute("data-name")
        removeItemCart(name)
    }
     })

     function removeItemCart(name){
       const index = carrinho.findIndex(item => item.name === name);

       if(index != -1){
        const item = carrinho[index]
        
         if(item.quantidade > 1){
             item.quantidade -=1
             updateCartModal()
             return;
         }

       carrinho.splice(index,1)
       updateCartModal();0
       }
     }

     Endereço.addEventListener('input',(event)=>{
        let inputValue = event.target.inputValue
        if(inputValue !== ""){
            Endereço.classList.remove("border-red-500")
             erro.classList.add("hidden")
        }


     })

     checkout.addEventListener('click',()=>{
       
        const isOpen = horario();

        if(!isOpen){
            alert("RESTAURANTE ESTA FECHADO!!")
            return;
        }


        if(carrinho.length === 0 )return;
        if(Endereço.value === ""){
            erro.classList.remove('hidden')
            Endereço.classList.add("border-red-500")
            return;
        }

  const carrinhoMapa = carrinho.map((item)=>{
     return(
        `${item.name} Quantidade: ${item.quantidade} Preço ${item.preço}|`
     )
  }).join("")

const message = encodeURIComponent(carrinhoMapa);
const Phone = "12996322883"

window.open(`https://wa.me/${Phone}?text=${message} Endereço: ${Endereço.value}, "_blank"`)
     })


     function horario (){
        const data = new Date();
        const hora = data.getHours()
        return hora >= 18 && hora < 22
     }

     const Hora = document.getElementById("horario")
     const isOpen = horario();

     if(isOpen){
      Hora.classList.remove("bg-red-500");
      Hora.classList.add("bg-green-600");
     }else{
        Hora.classList.remove("bg-green-600");
        Hora.classList.add("bg-red-500")
     }

     


