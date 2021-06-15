import React, { useEffect, useState, useContext, useCallback } from "react";
import { useLocation, useHistory } from "react-router";

import { Items } from "../shared/services";
import { LoaderContext } from "../shared/context/loader-context";
import shippingIcon from "../shared/assets/ic_shipping.png";

import "../styles/home.scss";

export default function Home() {
  const [items, setItems] = useState([]);
  const { isLoading, setIsLoading } = useContext(LoaderContext);
  const search = new URLSearchParams(useLocation().search).get("search");
  let history = useHistory();

  const fetchItems = useCallback(
    async (query) => {
      setIsLoading(true);
      try {
        const items = await Items.index(query);
        setItems(items.results);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    },
    [setIsLoading]
  );

  useEffect(() => {
    fetchItems(search);
  }, [search, fetchItems]);

  const handleItemClick = (id, event) => {
    event.preventDefault();
    history.push(`/items/${id}`);
  };

  return (
    <>
      {!isLoading && (
        <ol className="home">
          {!items.length && (
            <li className="item-no-results">
              <div className="no-results">
                <span className="no-results-text">
                  NO HAY RESULTADOS PARA ESTA BUSQUEDA, POR FAVOR PRUEBE CON OTRA PALABRA.
                </span>
              </div>
            </li>
          )}
          {!!items.length &&
            items.slice(0, 4).map((el) => (
              <li
                key={el.id}
                className="item-list"
                onClick={(e) => handleItemClick(el.id, e)}
              >
                <div className="item-image-container">
                  <img
                    className="item-image"
                    src={el.thumbnail}
                    alt="Miniatura del producto"
                    width="160"
                    height="160"
                  />
                </div>
                <div className="item-info-container">
                  <span className="item-price">
                    ${new Intl.NumberFormat().format(el.price)}
                    {!!el?.shipping?.free_shipping && (
                      <img
                        src={shippingIcon}
                        alt="Envio gratis"
                        className="item-shipping-icon"
                      />
                    )}
                  </span>
                  <h1 className="item-title">{el.title}</h1>
                </div>
                <div className="item-address-container">
                  <span className="item-address">{el.address.state_name}</span>
                </div>
              </li>
            ))}
        </ol>
      )}
    </>
  );
}
