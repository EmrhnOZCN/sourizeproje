package com.springsourize.controller;


import com.springsourize.service.SummaryService;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/public")
public class SummaryController {



    private final SummaryService summaryService;

    public SummaryController( SummaryService summaryService) {

        this.summaryService = summaryService;
    }

    @GetMapping("/summary/{postId}")
    public String getSummary(@PathVariable Long postId)  {
        return summaryService.querydata(postId);
    }

}
