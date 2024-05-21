<template>
  <div class="modal-overlay w-100" @click="closeModal" style="width: 80%">
    <div class="container modal-content" @click.stop>
      <button class="close-button" @click="closeModal">x</button>
      <div class="card w-100">
    <div class="card-body p-4">
      <h5 class="card-title fw-semibold mb-4">실거래가</h5>
      <div class="table-responsive" data-simplebar>
        <table class="table text-nowrap align-middle table-custom mb-0">
          <thead>
            <tr>
              <th scope="col" class="text-dark fw-normal ps-0">계약일</th>
              <th scope="col" class="text-dark fw-normal">거래금액 (만원)</th>
              <th scope="col" class="text-dark fw-normal">층수</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in PriceList" :key="index">
              <td class="ps-0">
                <div class="d-flex align-items-center gap-6">
                  <h6 class="mb-0">{{ item.formattedTradeYearMonth }}</h6>
                </div>
              </td>
              <td>
                <span>{{ item.formattedPrice }}</span>
              </td>
              <td>
                <span class="badge bg-success-subtle text-success">{{ item.floor }}</span>
              </td>
            </tr>

          </tbody>
        </table>
        <div class="row w-90 m-2 mt-3">
          <div class="col-3 p-0 m-0 align-items-center w-100">
            <button @click="addPriceList()" class="p-2 w-100 rounded-pill bg-light text-gray align-self-center" type="button"
              style="font-size: 12px; border: none">
              실거래가 조회
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, ref } from 'vue';
import Price from '../apt-detail/Price.vue';
import axios from 'axios';

const props = defineProps({
  dealInfo: Object
})

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};


const complexInfo = ref([]);

const fetchComplexInfo = async () => {
  if(!props.dealInfo)
  return;
  const path = `http://localhost:8080/where-is-my-home/api/v1/house-info/complexes/detail-info/${props.dealInfo.aptName}?dongCode=${props.dealInfo.dongCode}`;

  console.log('Fetching URL:', path);

  try {
    const response = await axios.get(path);
    console.log('API Response:', response);
    if (response.data && response.data.length > 0) {
      complexInfo.value = response.data[0];
      console.log("response")
      console.log(complexInfo.value);

      fetchComplexPriceInfo();
    } else {
      console.log('No data received');
    }
  } catch (error) {
    console.error('매물 조회 실패:', error.response ? error.response.data : error.message);
  }
};



const PriceList = ref([])
// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://new.land.naver.com/api'
});

// 요청 인터셉터 설정
apiClient.interceptors.request.use(config => {
  // 여기서 토큰을 가져와 동적으로 헤더에 설정할 수 있습니다.
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlJFQUxFU1RBVEUiLCJpYXQiOjE3MTU3NDQ1MjUsImV4cCI6MTcxNTc1NTMyNX0._b_fDuM-keqA8rcFpKG4si3ThGIHOgGoliKp9aIgwY4'; // 예: 로컬 스토리지나 다른 저장소에서 토큰 가져오기
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

function fetchComplexPriceInfo() {
  const newPriceList = ref([]);
  if (complexInfo.value) {
    console.log(complexInfo.value.complexNo);
    const complexNo = complexInfo.value.complexNo;
    const defaultPath = `/complexes/${complexNo}/prices/real?complexNo=${complexNo}&tradeType=A1&year=5&priceChartChange=false&areaNo=0&type=table`;

    apiClient.get(defaultPath)
      .then((response) => {
        console.log("price");
        response.data.realPriceOnMonthList.forEach(element => {
          element.realPriceList.forEach(row => {

            newPriceList.value.push(row);
          })
        });
        PriceList.value = newPriceList.value;
        console.log(PriceList.value);
      }).catch(() => {
        console.log("price 조회 실패");
      });
  }
}

function addPriceList() {
  const newPriceList = ref([]);
    const complexNo = complexInfo.complexNo;
    const defaultPath = `/complexes/${complexNo}/prices/real?complexNo=${complexNo}&tradeType=A1&year=5&priceChartChange=false&areaNo=2&addedRowCount=${PriceList.value.length + 1}&type=table`;

    console.log(defaultPath);

    PriceList.value.forEach(element => {
      newPriceList.value.push(element);
    })
    
    apiClient.get(defaultPath)
      .then((response) => {
        console.log("price");
        response.data.realPriceOnMonthList.forEach(element => {
          element.realPriceList.forEach(row => {

            newPriceList.value.push(row);
          })
        });
        PriceList.value = newPriceList.value;
        console.log(PriceList.value);
      }).catch(() => {
        console.log("price 조회 실패");
      });
}


fetchComplexInfo();

</script>

<style scoped>
.modal-overlay {
  position: absolute;
  z-index: 1050;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>