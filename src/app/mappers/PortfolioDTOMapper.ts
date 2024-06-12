import { Portfolio } from "../../domain/portfolio/model/Portfolio";
import { PortfolioShareItem } from "../../domain/portfolio/model/PortfolioShareItem";
import { ReadablePortfolioDTO } from "../dtos/ReadablePortfolioDTO";
import { ReadablePortfolioShareItemDTO } from "../dtos/ReadablePortfolioShareItemDTO";

export const PortfolioDTOMapper = (function () {
    function toReadablePortfolioShareItemDTO(shareItem: PortfolioShareItem): ReadablePortfolioShareItemDTO {
        return {
            shareSymbol: shareItem.share.symbol,
            portfolioId: shareItem.portfolioId,
            quantity: shareItem.quantity
        }
    }

    function toReadablePortfolioShareItemDTOList(shareItems: PortfolioShareItem[]): ReadablePortfolioShareItemDTO[] {
        return shareItems.map(shareItem => toReadablePortfolioShareItemDTO(shareItem))
    }

    function toReadablePortfolioDTO(portfolio: Portfolio): ReadablePortfolioDTO {
        return {
            id: portfolio.id,
            name: portfolio.name,
            userId: portfolio.userId,
            shareItems: toReadablePortfolioShareItemDTOList(portfolio.shareItems)
        }
    }

    function toReadablePortfolioDTOList(portfolios: Portfolio[]): ReadablePortfolioDTO[] {
        return portfolios.map(portfolio => toReadablePortfolioDTO(portfolio))
    }

    return {
        toReadablePortfolioDTO,
        toReadablePortfolioDTOList
    }
})()