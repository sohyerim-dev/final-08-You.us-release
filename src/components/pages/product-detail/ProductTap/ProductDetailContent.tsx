export default function ProductDtailContent() {
  return (
    <div className="space-y-8 py-8">
      {/* 상품 라벨 정보 */}
      <section>
        <h2 className="mb-4 text-lg font-bold">상품 라벨 정보</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-blue-500 p-6 text-center text-white">
            <div className="mb-2 text-xl font-bold">동원샘물</div>
            <div className="mb-1 text-sm">NATURAL MINERAL</div>
            <div className="mb-1 text-sm">WATER</div>
            <div className="mb-4 text-xs">경기 청원군 청원</div>
            <div className="mt-4">
              <div className="inline-block rounded bg-white px-4 py-2 text-sm text-blue-500">
                라벨
              </div>
            </div>
            <div className="mt-4 text-2xl font-bold">2L</div>
          </div>
          <div className="rounded-lg bg-blue-500 p-6 text-center text-white">
            <div className="mb-2 text-xl font-bold">동원샘물</div>
            <div className="mb-1 text-sm">MINERAL</div>
            <div className="mb-1 text-sm">WATER</div>
            <div className="mb-4 text-xs">경기 청원군 청원</div>
            <div className="mt-4">
              <div className="inline-block rounded bg-white px-4 py-2 text-sm text-blue-500">
                라벨
              </div>
            </div>
            <div className="mt-4 text-2xl font-bold">2L</div>
          </div>
        </div>
      </section>

      {/* 제품 상세정보 */}
      <section>
        <h2 className="mb-4 text-lg font-bold">제품 상세정보</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="w-1/4 bg-gray-50 p-4 font-medium">제품명</td>
                <td className="p-4">정유정생 2L</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="bg-gray-50 p-4 font-medium">내용량</td>
                <td className="p-4">2L</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="bg-gray-50 p-4 font-medium">보관법/용기</td>
                <td className="p-4">제품은 / 깨끗하고 속 건조한</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="bg-gray-50 p-4 font-medium">수입자 / 제조원</td>
                <td className="p-4">
                  <div className="space-y-1 text-sm">
                    <p>(이)대한통운 인증점호 경기도 안산시 단원구 초지로 256</p>
                    <p>
                      (이)대한통운 인증점호 경기도 안산시 상록구 수인로 2210
                    </p>
                    <p>(이)대한통운 인증점호 경기도 안산시 초지로 257</p>
                    <p>문의(고) : 경기도 안산시 단원구 안현로 1052</p>
                    <p>
                      (이)시설공동 : 대리도 공물전 선의의 귀도사 세관자 수장
                      2호1
                    </p>
                    <p>(이)시도 : 경동도 혁동도 경정도 선박료 2147-16</p>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="bg-gray-50 p-4 font-medium">판매원</td>
                <td className="p-4 text-sm">
                  (이)는 판매원 : 서울 서초 등 정보(www.dw.co.kr)
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="bg-gray-50 p-4 font-medium">본방법등</td>
                <td className="p-4">
                  <div className="space-y-1 text-sm">
                    <p>소비자본인(등)확인방법</p>
                    <p>이름</p>
                    <p>
                      화석 보관되는 네트워크 선박수 소비자들이 기준하신
                      산시됩니다.
                    </p>
                    <p>
                      헤당 당산사에서 보진 곳으로 근도회된곳으로도 서로
                      산시됩니다.
                    </p>
                    <p>조구가 추가정리안전입니다.</p>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="bg-gray-50 p-4 font-medium">소비자상</td>
                <td className="p-4 text-sm">
                  소비자를 소식으로 근혁할 수공는 관화하조로 또한
                  소비자산전제안안입니다.
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="bg-gray-50 p-4 font-medium">보상처 주의사항</td>
                <td className="p-4">
                  <div className="space-y-1 text-sm">
                    <p>
                      - 개등, 수도로 단요식의 국내외 수주가 저도가 변으실
                      합니다.
                    </p>
                    <p>- 환등은 / 깨끗도 속 건조한 곳에서 처리 산시됩니다.</p>
                    <p>- 때등도 제때 단도 등 실동 산시됩니다.</p>
                    <p>- 조구가 때수귀미 ( 때등 산아 등 등 조근안니다.</p>
                    <p>
                      - 때등도 보시 알앙 여떤식 제등안나 비면여점안전 (산)식
                      곳주도 산정 관에화시 니산시니니다.
                    </p>
                    <p>
                      - 제품 속에 단요 식을 때식이 근형식으는 특취 주변문니니다.
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
