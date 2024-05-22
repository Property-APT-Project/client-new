<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import AptInterestCard from "@/components/my-feed/interest/AptInterestCard.vue";
import AreaInterestCard from "@/components/my-feed/interest/AreaInterestCard.vue";
import AptSale from "@/components/apt-info/sales/AptSale.vue";
import PostCard from "@/components/community/PostCard.vue";
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";
import PostCardFeed from "@/components/community/PostCardFeed.vue";
import MyFeedPostList from "@/components/my-feed/MyFeedPostList.vue";

const posts = ref([]);
const scrollContainerRef = ref(null);

const loadPosts = async () => {
  try {
    const response = await axios.get(`/api/posts`);
    posts.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const scrollLeft = () => {
  if (scrollContainerRef.value) {
    scrollContainerRef.value.scrollBy({
      left: -300, // Adjust this value according to the width of your cards
      behavior: "smooth",
    });
  }
};

const scrollRight = () => {
  if (scrollContainerRef.value) {
    scrollContainerRef.value.scrollBy({
      left: 300, // Adjust this value according to the width of your cards
      behavior: "smooth",
    });
  }
};
const activeSale = ref(true);
const activeComplex = ref(false);

const activateSale = () => {
  activeSale.value = true;
  // isSelectComplex.value = false;
  activeComplex.value = false;
};

const activateComplex = () => {
  activeSale.value = false;
  // isSelectComplex.value = false;
  activeComplex.value = true;
};

onMounted(() => {
  loadPosts();
});

const coordinate = {
  lat: 37.537547,
  lng: 127.010049,
};
</script>

<template>
  <div class="body-wrapper ms-0 me-0">
    <div class="body-wrapper-inner mb-6 container-fluid w-100">
      <nav class="tap d-flex justify-content-between">
        <h1 class="">관심 단지 / 지역</h1>
        <ul class="nav nav-tabs ">
          <li class="nav-item">
            <button
              :class="{ 'nav-link': true, active: activeSale }"
              @click="activateSale"
            >
              매물
            </button>
          </li>
          <li class="nav-item">
            <button
              :class="{ 'nav-link': true, active: activeComplex }"
              @click="activateComplex"
            >
              아파트 단지
            </button>
          </li>
        </ul>
      </nav>
      <div v-if="activeSale" class="card-group card-group-scroll">
        <AreaInterestCard />
        <AreaInterestCard />
        <div class="card">
          <img
            src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp"
            class="card-img-top"
            alt="Hollywood Sign on The Hill"
          />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
        <div class="card">
          <img
            src="https://mdbcdn.b-cdn.net/img/new/standard/city/042.webp"
            class="card-img-top"
            alt="Palm Springs Road"
          />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              This card has supporting text below as a natural lead-in to
              additional content.
            </p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
        <div class="card">
          <img
            src="https://mdbcdn.b-cdn.net/img/new/standard/city/043.webp"
            class="card-img-top"
            alt="Los Angeles Skyscrapers"
          />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This card has even longer content
              than the first to show that equal height action.
            </p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
        <div class="card">
          <img
            src="https://mdbcdn.b-cdn.net/img/new/standard/city/044.webp"
            class="card-img-top"
            alt="Hollywood Sign on The Hill"
          />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
        <div class="card">
          <img
            src="https://mdbcdn.b-cdn.net/img/new/standard/city/045.webp"
            class="card-img-top"
            alt="Palm Springs Road"
          />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              This card has supporting text below as a natural lead-in to
              additional content.
            </p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
        <div class="card">
          <img
            src="https://mdbcdn.b-cdn.net/img/new/standard/city/046.webp"
            class="card-img-top"
            alt="Los Angeles Skyscrapers"
          />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This card has even longer content
              than the first to show that equal height action.
            </p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
      </div>
      <div v-else class="card-group card-group-scroll">
        <AptInterestCard />
        <AptInterestCard />
        <div class="card">
          <img
            src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp"
            class="card-img-top"
            alt="Hollywood Sign on The Hill"
          />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
        <div class="card">
          <img
            src="https://mdbcdn.b-cdn.net/img/new/standard/city/042.webp"
            class="card-img-top"
            alt="Palm Springs Road"
          />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              This card has supporting text below as a natural lead-in to
              additional content.
            </p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
        <div class="card">
          <img
            src="https://mdbcdn.b-cdn.net/img/new/standard/city/043.webp"
            class="card-img-top"
            alt="Los Angeles Skyscrapers"
          />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This card has even longer content
              than the first to show that equal height action.
            </p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
        <div class="card">
          <img
            src="https://mdbcdn.b-cdn.net/img/new/standard/city/044.webp"
            class="card-img-top"
            alt="Hollywood Sign on The Hill"
          />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
        <div class="card">
          <img
            src="https://mdbcdn.b-cdn.net/img/new/standard/city/045.webp"
            class="card-img-top"
            alt="Palm Springs Road"
          />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              This card has supporting text below as a natural lead-in to
              additional content.
            </p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
        <div class="card">
          <img
            src="https://mdbcdn.b-cdn.net/img/new/standard/city/046.webp"
            class="card-img-top"
            alt="Los Angeles Skyscrapers"
          />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This card has even longer content
              than the first to show that equal height action.
            </p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
      </div>
      <h1 class="">좋아요한 매물</h1>
      <div class="card-group card-group-scroll">
        <!-- <div class="card"> -->
          <div class="card h-50">

            <KakaoMap
              :lat="coordinate.lat"
              :lng="coordinate.lng"
              :draggable="true"
              level="5"
              style="height: 200px"
              class="w-100"
            >
              <KakaoMapMarker
                :lat="coordinate.lat"
                :lng="coordinate.lng"
              ></KakaoMapMarker>
            </KakaoMap>
            <AptSale class="" :info="{ aptName: '한남더힐' }" />
            
          </div>
        <!-- <img
            src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp"
            class="card-img-top"
            alt="Hollywood Sign on The Hill"
            />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div> -->
        <!-- </div> -->
        <!-- <div class="card">
          <li class="sidebar-item mb-3">
            <a class="" href="/apt-detail">
              <div class="row bg-gray p-3" style="background-color: white">
                <div class="col-5 d-flex">
                  <img
                    class="rounded w-100 align-middle"
                    src="@/assets/images/blog/blog-img1.jpg"
                    alt="prd1"
                  />
                </div>
                <div class="col-7">
                  <div class="row">
                    <div class="col-9">
                      <h5 class="omyu_pretty">한남더힐</h5>
                    </div>
                    <div class="col-3">
                      <input type="checkbox" id="heart" />
                    </div>
                  </div>

                  <h6 class="">100 만원</h6>
                  <p class="mb-0">50 층 / 남향</p>
                </div>
              </div>
            </a>
          </li>
        </div> -->
        <div class="card h-50">
          <img
            src="@/assets/images/blog/blog-img1.jpg"
            class="card-img-top"
            alt="Palm Springs Road"
          />
          <div class="card-body">
            <h5 class="card-title">한남더힐</h5>
            <p class="card-text">
              <h6 class="mb-0">100 만원</h6>
              <p class="mb-0 text-black">50 층 / 남향</p>
              <!-- <p class="mb-0 text-black">남향</p> -->
            </p>
          </div>
          <!-- <div class="card-footer"> -->
            <!-- <small class="text-muted">Last updated 3 mins ago</small> -->
                    <KakaoMap
              :lat="coordinate.lat"
              :lng="coordinate.lng"
              :draggable="true"
              level="5"
              style="height: 200px"
              class="w-100"
            >
              <KakaoMapMarker
                :lat="coordinate.lat"
                :lng="coordinate.lng"
              ></KakaoMapMarker>
            </KakaoMap>
          <!-- </div> -->
        </div>
        <div class="card">
          <img
            src="https://mdbcdn.b-cdn.net/img/new/standard/city/043.webp"
            class="card-img-top"
            alt="Los Angeles Skyscrapers"
          />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This card has even longer content
              than the first to show that equal height action.
            </p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
        <div class="card">
          <img
            src="https://mdbcdn.b-cdn.net/img/new/standard/city/044.webp"
            class="card-img-top"
            alt="Hollywood Sign on The Hill"
          />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
        <div class="card">
          <img
            src="https://mdbcdn.b-cdn.net/img/new/standard/city/045.webp"
            class="card-img-top"
            alt="Palm Springs Road"
          />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              This card has supporting text below as a natural lead-in to
              additional content.
            </p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
        <div class="card">
          <img
            src="https://mdbcdn.b-cdn.net/img/new/standard/city/046.webp"
            class="card-img-top"
            alt="Los Angeles Skyscrapers"
          />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This card has even longer content
              than the first to show that equal height action.
            </p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
      </div>
      <h1>나의 글</h1>
      <MyFeedPostList />
    </div>
  </div>
</template>

<style scoped>
body {
  padding-top: 2rem;
}

@media (min-width: 576px) {
  .card-group.card-group-scroll {
    overflow-x: auto;
    flex-wrap: nowrap;
  }
}

.card-group.card-group-scroll > .card {
  flex-basis: 35%;
}
</style>
