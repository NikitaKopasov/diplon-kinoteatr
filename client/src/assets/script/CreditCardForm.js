import React, { useState, useEffect, useRef, useContext } from "react";
import "../css/creditcard.css";
import {addUserCard} from "../../http/cardApi"
import Card from "./Card";
import {Context} from '../../index'

const getCardType = (number) => {
    if (/^4/.test(number)) return "visa";
    if (/^(34|37)/.test(number)) return "amex";
    if (/^5[1-5]/.test(number)) return "mastercard";
    if (/^6011/.test(number)) return "discover";
    if (/^9792/.test(number)) return "troy";
    return "visa";
  };
  
  const formatCardNumber = (value, type) => {
    const digitsOnly = value.replace(/[^0-9]/g, "");
    const pattern = type === "amex" ? /\d{1,4}|\d{1,6}|\d{1,5}/g : /\d{1,4}/g;
    const matches = digitsOnly.match(pattern);
    return matches ? matches.join(" ") : "";
  };
  
  const maskCardNumber = (formattedNumber, type) => {
    const parts = formattedNumber.split(" ");
    if (type === "amex") {
      return parts.map((p, i) => (i === 1 ? "*".repeat(p.length) : p)).join(" ");
    }
    return parts.map((p, i) => (i === 1 || i === 2 ? "*".repeat(p.length) : p)).join(" ");
  };
  
  const CreditCardForm = () => {

    const {user} = useContext(Context)
    const [cardOwner, setcardOwner] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [activeMonth, setactiveMonth] = useState("");
    const [activeYear, setactiveYear] = useState("");
    const [cvcCvv, setcvcCvv] = useState("");
    const [isFlipped, setIsFlipped] = useState(false);
    const [currentCardBackground, setCurrentCardBackground] = useState(
      Math.floor(Math.random() * 25 + 1)
    );
  
    const minactiveYear = new Date().getFullYear();
    const minactiveMonth = activeYear === minactiveYear.toString() ? new Date().getMonth() + 1 : 1;
    const cardType = getCardType(cardNumber);
    const maskedCardNumber = maskCardNumber(cardNumber, cardType);
  
    const handleCardNumberChange = (e) => {
      const formatted = formatCardNumber(e.target.value, cardType);
      setCardNumber(formatted);
    };
  
    const handleFocus = () => setIsFlipped(false);
    const handleCvvFocus = () => setIsFlipped(true);
  
    const handleSubmit = async () => {
      
      if (!cardOwner || !cardNumber || !activeMonth || !activeYear || !cvcCvv) {
        alert("Пожалуйста, заполните все поля.");
        return;
      }
      
      try {
        const data = {
          cardOwner,
          cardNumber: cardNumber.replace(/\s/g, ""), 
          activeMonth,
          activeYear,
          cvcCvv,
          cardType,
          userId: user.user.id
        };

        const response = await addUserCard(data)
    
        console.log("Карта добавлена:", response.data);
        alert("Карта успешно добавлена!");
        
        setcardOwner("");
        setCardNumber("");
        setactiveMonth("");
        setactiveYear("");
        setcvcCvv("");
      } catch (error) {
        console.error("Ошибка при добавлении карты:", error);
        alert("Не удалось добавить карту.");
      }
    };
    
    return (
      <div className="wrapper">
        <div className="card-form">
          <div className="card-list">
            <Card
              isFlipped={isFlipped}
              cardNumber={maskedCardNumber}
              cardOwner={cardOwner}
              activeMonth={activeMonth}
              activeYear={activeYear}
              cvcCvv={cvcCvv}
              cardType={cardType}
              currentCardBackground={currentCardBackground}
            />
          </div>
  
          <div className="card-form__inner">
            <div className="card-input">
              <label htmlFor="cardNumber" className="card-input__label">Номер карты</label>
              <input
                type="text"
                id="cardNumber"
                className="card-input__input"
                value={cardNumber}
                onChange={handleCardNumberChange}
                maxLength={cardType === "amex" ? 17 : 19}
                onFocus={handleFocus}
                autoComplete="off"
              />
            </div>
  
            <div className="card-input">
              <label htmlFor="cardOwner" className="card-input__label">Владелец карты</label>
              <input
                type="text"
                id="cardOwner"
                className="card-input__input"
                value={cardOwner}
                onChange={(e) => setcardOwner(e.target.value)}
                onFocus={handleFocus}
                autoComplete="off"
              />
            </div>
  
            <div className="card-form__row">
              <div className="card-form__col">
                <div className="card-form__group">
                  <label className="card-input__label">Срок годности</label>
                  <select
                    className="card-input__input -select"
                    value={activeMonth}
                    onChange={(e) => setactiveMonth(e.target.value)}
                  >
                    <option value="" disabled>Месяц</option>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                      <option
                        key={n}
                        value={n < 10 ? `0${n}` : `${n}`}
                        disabled={n < minactiveMonth}
                      >
                        {n < 10 ? `0${n}` : n}
                      </option>
                    ))}
                  </select>
                  <select
                    className="card-input__input -select"
                    value={activeYear}
                    onChange={(e) => setactiveYear(e.target.value)}
                  >
                    <option value="" disabled>Год</option>
                    {Array.from({ length: 12 }, (_, i) => i + minactiveYear).map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>
  
              <div className="card-form__col -cvv">
                <div className="card-input">
                  <label htmlFor="cvcCvv" className="card-input__label">CVС2/СVV2</label>
                  <input
                    type="text"
                    id="cvcCvv"
                    className="card-input__input"
                    value={cvcCvv}
                    onChange={(e) => setcvcCvv(e.target.value.replace(/[^0-9]/g, ""))}
                    onFocus={handleCvvFocus}
                    onBlur={handleFocus}
                    maxLength={3}
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
  
            <button onClick={handleSubmit} className="card-form__button">Добавить</button>
          </div>
        </div>
      </div>
    );
  };
  
export default CreditCardForm;
