<script lang="ts">
    import { register } from 'swiper/element/bundle';
    import { onMount } from "svelte";
    import InternalCard from "./InternalCard.svelte";
  
    onMount(async () => {
      register();

      var swiper = new Swiper(".mySwiperDestaques", {
      slidesPerView: 3,
      spaceBetween: 30,
      loop:true,
      grabCursor: false,
      navigation: {
        nextEl: ".swiper-button-nextDestaques",
        prevEl: ".swiper-button-prevDestaques",
      },
    //   pagination: {
    //     el: ".swiper-pagination",
    //     clickable: true,
    //   },
    });
     
  
      });
  </script>


<div class="w-4/6 h-[500px] ml-auto mr-auto mt-24 mb-24">
    <h1 class="text-[40px]">DESTAQUES</h1>
        <div class="swiper mySwiperDestaques">
            <div class="swiper-wrapper pt-6 pl-1">
              <div class="swiper-slide rounded-lg flex flex-col">
                <div class="w-full h-4/6">
                    <InternalCard idSwiper={"1"}/>
                </div>
                <div class="w-full h-2/6 text-center description">
                    <h3>Moletom Lacoste branco e azul</h3>
                    <h1 class="mt-6">R$180,00</h1>
                </div>
              </div>

              <div class="swiper-slide rounded-lg flex flex-col">
                <div class="w-full h-4/6">
                    <InternalCard idSwiper={"2"}/>
                </div>
                <div class="w-full h-2/6 text-center description">
                    <h3>Moletom Lacoste branco e azul</h3>
                    <h1 class="mt-6">R$180,00</h1>
                </div>
              </div>

              <div class="swiper-slide rounded-lg flex flex-col">
                <div class="w-full h-4/6">
                    <InternalCard idSwiper={"3"}/>
                </div>
                <div class="w-full h-2/6 text-center description">
                    <h3>Moletom Lacoste branco e azul</h3>
                    <h1 class="mt-6">R$180,00</h1>
                </div>
              </div>
      
            </div>
            <div class="swiper-button-prev swiper-button-prevDestaques"></div>
            <div class="swiper-button-next swiper-button-nextDestaques"></div>

            <div class="swiper-pagination"></div>
          </div>
          
</div>

<style>
    .description h3{
        font-family: "Roboto-Light";
    }

    .description h1{
        font-family: "Roboto-Bold";
        font-size: 26px;
    }

    h1{
        font-family: "Roboto-Black-Italic";
    }
    .mySwiperDestaques {
      width: 100%;
      height: 100%;
    }

    .swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0px 0px 5px rgb(0, 0, 0, 0.5);
      height: 90%;
    }

</style>