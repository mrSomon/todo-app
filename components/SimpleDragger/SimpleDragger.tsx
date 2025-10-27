"use client";
import React from "react";

interface ICard {
  id: number;
  order: number;
  title: string;
}

const SimpleDragger = () => {
  const [cardList, setCardList] = React.useState<ICard[]>([
    { id: 1, order: 1, title: "Карточка 1" },
    { id: 2, order: 2, title: "Карточка 2" },
    { id: 3, order: 3, title: "Карточка 3" },
    { id: 4, order: 4, title: "Карточка 4" },
  ]);
  const [currentCard, setCurrentCard] = React.useState<ICard | null>(null);

  function dragStartHandler(
    event: React.DragEvent<HTMLDivElement>,
    card: ICard
  ) {
    setCurrentCard(card);
  }
  function dragLeaveHandler(event: React.DragEvent<HTMLDivElement>) {
    // @ts-ignore
    event.target.style.background = "white";
  }
  function dragEndHandler(event: React.DragEvent<HTMLDivElement>) {
    // @ts-ignore
    event.target.style.background = "white";
  }
  function dragOverHandler(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    // @ts-ignore
    event.target.style.background = "lightgray";
  }
  function dropHandler(event: React.DragEvent<HTMLDivElement>, card: ICard) {
    event.preventDefault();
    if (!currentCard) return;
    console.log("on-drop", card);
    setCardList(
      cardList.map((c) => {
        if (c.id === card.id) {
          return { ...c, order: currentCard?.order };
        }
        if (c.id === currentCard?.id) {
          return { ...c, order: card.order };
        }
        return c;
      })
    );
    // @ts-ignore
    event.target.style.background = "white";
  }

  function onDrop(event: React.DragEvent<HTMLDivElement>, status: string, index: number){
    if(!currentCard) return;
    
    // const taskToMove = tasks[currentCard]
  }

  const sortCards = (a: ICard, b: ICard) => (a.order > b.order ? 1 : -1);

  return (
    <div className="border rounded px-5 py-5 flex flex-col">
      {cardList.sort(sortCards).map((card) => (
        <React.Fragment key={card.id}>
          <div
            draggable
            className="hover:cursor-grab border w-full rounded py-2 px-4 bg-white active:cursor-grabbing"
            onDragStart={(event) => dragStartHandler(event, card)}
            onDragLeave={(event) => dragLeaveHandler(event)}
            onDragEnd={(event) => dragEndHandler(event)}
            onDragOver={(event) => dragOverHandler(event)}
            
            // onDrop={(event) => dropHandler(event, card)}
          >
            {card.title}
          </div>
          <DropableLayoutItem card={card} 
          // dropHandler={dropHandler}
           />
        </React.Fragment>
      ))}
    </div>
  );
};

export default SimpleDragger;

const DropableLayoutItem = ({ dropHandler, card }: any) => {
  const [showDrop, setShowDrop] = React.useState(false);

  return (
    <div
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      
      onDragOver={(event)=>event.preventDefault()}

      className={`${
        showDrop ? "opacity-100 h-10" : "opacity-0"
      } transition-opacity border border-dashed rounded w-full h-3`}
      onDrop={(event) => dropHandler(event, card)}
    ></div>
  );
};
