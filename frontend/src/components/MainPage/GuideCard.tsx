import { Link } from "react-router-dom"

const data = [
  {
    imgUri : '/images/point_ill.png',
    title : 'GET POINT!',
    description : '문제를 풀어 포인트를 모으세요!',
    button : '문제풀러 가기',
    buttonUrl : '/quiz',
    disclaimer : '* 문제는 다양한 분야의 상식 퀴즈에요.'
  },
  {
    imgUri : '/images/cart_ill.webp',
    title : 'PICK!',
    description : '마음에 드는 상품을 장바구니에 담으세요!',
    button : '장바구니 보기',
    buttonUrl : '/all_products',
    disclaimer : '* 상품은 허위이며 배송되지 않아요.'
  },
  {
    imgUri : '/images/question_ill.jpg',
    title : '의미 없기!',
    description : '의미는 없습니다! 나만의 상품들을 모아서 컬렉션을 모아보세요!',
    button : '컬렉션 보기',
    buttonUrl : '/collection',
    disclaimer : '* 의미는 딱히 없습니다!'
  },
  {
    imgUri : '/images/dev_ill.avif',
    title : '왜냐하면!',
    description : '3일만에 만들어진 포트폴리오 사이트이기 때문이에요.',
    button : '개발자 보기',
    buttonUrl : '#dev',
    disclaimer : '* 의미는 딱히 없습니다!'
  },
]

const GuideCard = ():React.ReactElement =>{
  return (
    <ul className="guide_card_list">
      {
        data.map( item =>{
          return (
            <li className="guide_card" key={item.title}>
              <img src={item.imgUri} alt="" />
              <div className="context">
                <h4 className="title">{item.title}</h4>
                <p className="description">{item.description}</p>
                <p className="disclaimer">{item.disclaimer}</p>
                <Link to={item.buttonUrl} className="link_button">{item.button}</Link>
              </div>
            </li>
          )
        })
      }
    </ul>

  )
}

export default GuideCard;