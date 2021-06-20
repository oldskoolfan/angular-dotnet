using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using calculator.Models;
using calculator.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace calculator.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class QuotationController : ControllerBase
    {
        private readonly ILogger<QuotationController> _logger;
        private readonly IQuotationService _quotationService;

        public QuotationController(ILogger<QuotationController> logger, IQuotationService quotationService)
        {
            _logger = logger;
            _quotationService = quotationService;
        }

        [HttpPost]
        [Authorize]
        public ActionResult Post([FromBody] QuotationRequest quoteRequest)
        {
            return Ok(new QuotationResponse
            {
                CurrencyId = quoteRequest.CurrencyId,
                QuotationId = Guid.NewGuid(),
                total = _quotationService.CalculateTotal(quoteRequest)
            });
        }
    }
}
