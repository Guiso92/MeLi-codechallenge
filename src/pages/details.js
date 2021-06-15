import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";

import { Items } from "../shared/services";
import { LoaderContext } from "../shared/context/loader-context";
import "../styles/details.scss";

export default function Details() {
  const { id } = useParams();
  const { isLoading, setIsLoading } = useContext(LoaderContext);
  const [data, setData] = useState(null);
  const [description, setDescription] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const itemData = await Items.single(id);
      itemData.price = new Intl.NumberFormat().format(itemData.price)
      setData(itemData);
      const itemDesc = await Items.singleDescription(id);
      setDescription(itemDesc);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }, [id, setIsLoading]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className={`details ${!isLoading ? 'details-load':'details-loading'}`}>
      {!isLoading && data && (
        <div className="details-data">
          <div className="details-image-container">
            <img
              className="details-image"
              src={data?.pictures[0]?.secure_url}
              alt="Imagen del producto"
            />
          </div>
          <div className="details-info-container">
            <div className="details-info-subtitle-container">
              <span className="details-info-subtitle">{`${
                data.condition === "new" ? "Nuevo" : "Usado"
              } - ${data.sold_quantity} vendidos`}</span>
            </div>
            <div className="details-info-title-container">
              <h1 className="details-info-title">{data.title}</h1>
            </div>
            <div className="details-info-price-container">
              <span className="details-info-price">${data.price}</span>
            </div>
            <div className="details-info-button-container">
              <a href={data.permalink} className="details-info-button">
                Comprar
              </a>
            </div>
          </div>
        </div>
      )}
      {!isLoading && description && (
        <div className="details-description">
          <span className="details-description-title">Descripción del producto</span>
          <p className="details-description-paragraph">{description.plain_text}</p>
        </div>
      )}
      {!isLoading && !data && !description && (
        <div className="no-results">
          <span>NO HAY NADA RESULTADOS DISPONIBLES, POR FAVOR VUELVA A LA PANTALLA ANTERIOR HACIENDO CLICK <a href="/">AQUÍ</a> O
          INTENTE UNA NUEVA BUSQUEDA EN LA BARRA SUPERIOR.</span>
        </div>
      )}
    </div>
  );
}
