const DeveloperCard = ():React.ReactElement =>{
  return (
    <div className="developer_card">
      <h4 className="title">개발자는 누구?</h4>
      <div className="card">
        <div className="img_round_wrap">
          <img className="dev_img" src="/images/dev_img.jpg" alt="" />
        </div>
        <div className="spec">
          <h5>이준우</h5>
          <ul>
            <li>풀스택 개발자로 나만의 서비스를 구축하고 싶은 꿈을 가진 현 웹 퍼블리셔입니다.</li>
            <li>LG OLED TV BrandSite 프로젝트의 6개 페이지를 개발하고 운영하고 있습니다. (약 60여개 국가)</li>
            <li>웹 산업 전반에 대한 지식과 신기술에 대해 관심이 많습니다.</li>
            <li>급하게 포트폴리오를 제작하느라 부족한 점이 많지만 봐주셔서 감사합니다.</li>
          </ul>
        </div>
      </div>
      <div className="spec">
        <h4>기술스택</h4>
        <img src="/images/spec1.png" alt="" />
      </div>
      <div className="spec_plus">
        <a href="">GitHub</a>
        <a href="">현재 사이트 ERD 보러가기</a>
        <a href="">현재 사이트 컴포넌트 설계 보러가기</a>
        <a href="">공부 어떻게 하는지 보러가기</a>
      </div>
    </div>
  )
}

export default DeveloperCard;