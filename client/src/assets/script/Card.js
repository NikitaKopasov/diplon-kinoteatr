import React from "react";

const Card = ({
  isFlipped,
  cardNumber,
  cardName,
  cardMonth,
  cardYear,
  cardCvv,
  cardType,
  currentCardBackground
}) => {
  return (
    <div className={`card-item ${isFlipped ? "-active" : ""}`}>
      <div className="card-item__side -front">
        <div className="card-item__cover">
          <img
            src={`https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${currentCardBackground}.jpeg`}
            className="card-item__bg"
            alt="card background"
          />
        </div>
        <div className="card-item__wrapper">
          <div className="card-item__top">
            <img
              src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png"
              className="card-item__chip"
              alt="chip"
            />
            <div className="card-item__type">
              {cardType && (
                <img
                  src={`https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${cardType}.png`}
                  className="card-item__typeImg"
                  alt={cardType}
                />
              )}
            </div>
          </div>
          <label className="card-item__number">
            {cardNumber || "#### #### #### ####"}
          </label>
          <div className="card-item__content">
            <label className="card-item__info">
              <div className="card-item__holder">Владелец карты</div>
              <div className="card-item__name">
                {cardName || "Имя Фамилия"}
              </div>
            </label>
            <div className="card-item__date">
              <label className="card-item__dateTitle">Срок</label>
              <label className="card-item__dateItem">
                {cardMonth || "MM"}
              </label>
              /
              <label className="card-item__dateItem">
                {cardYear ? cardYear.toString().slice(2, 4) : "ГГ"}
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="card-item__side -back">
        <div className="card-item__cover">
          <img
            src={`https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${currentCardBackground}.jpeg`}
            className="card-item__bg"
            alt="card background"
          />
        </div>
        <div className="card-item__band"></div>
        <div className="card-item__cvv">
          <div className="card-item__cvvTitle">CVC2/CVV2</div>
          <div className="card-item__cvvBand">
            {cardCvv.replace(/./g, "*")}
          </div>
          <div className="card-item__type">
            <img
              src={`https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${cardType}.png`}
              className="card-item__typeImg"
              alt={cardType}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;